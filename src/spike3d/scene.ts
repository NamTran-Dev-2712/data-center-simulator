// Spike only: builds the low-poly data center room. Not part of the game.
// Repeated parts use InstancedMesh, static parts are merged, to keep draw calls low.
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { LED_GREEN, LED_RED, type Theme } from './themes'

export const ROOM_SIZE = 10
export const WALL_HEIGHT = 3

const RACK_X = [-3, -1.5, 0, 1.5]
const RACK_Z = -3.2
const RACK_W = 0.8
const RACK_H = 2
const RACK_D = 1
const TRAYS_PER_RACK = 4

export interface SpikeScene {
  /** Meshes that can be tapped; userData.perRack = instances per rack. */
  pickables: THREE.InstancedMesh[]
  toggleRack(index: number): void
  applyTheme(theme: Theme): void
}

const mat = () => new THREE.MeshLambertMaterial()

function rounded(w: number, h: number, d: number, radius: number, segments = 2): THREE.BufferGeometry {
  return new RoundedBoxGeometry(w, h, d, segments, radius)
}

/** Places a geometry copy at (x, y, z) so several pieces can be merged into one mesh. */
function at(geo: THREE.BufferGeometry, x: number, y: number, z: number, rotY = 0): THREE.BufferGeometry {
  const g = geo.clone()
  if (rotY) g.rotateY(rotY)
  g.translate(x, y, z)
  return g
}

function instanced(geo: THREE.BufferGeometry, material: THREE.Material, positions: THREE.Vector3[]): THREE.InstancedMesh {
  const mesh = new THREE.InstancedMesh(geo, material, positions.length)
  const m = new THREE.Matrix4()
  positions.forEach((p, i) => mesh.setMatrixAt(i, m.makeTranslation(p.x, p.y, p.z)))
  mesh.instanceMatrix.needsUpdate = true
  return mesh
}

function gridLines(material: THREE.LineBasicMaterial): THREE.LineSegments {
  const half = ROOM_SIZE / 2
  const pts: number[] = []
  for (let i = 1; i < ROOM_SIZE; i++) {
    const v = -half + i
    pts.push(v, 0, -half, v, 0, half, -half, 0, v, half, 0, v)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
  const lines = new THREE.LineSegments(geo, material)
  lines.position.y = 0.005
  return lines
}

function buildTechnician(m: { skin: THREE.Material; hair: THREE.Material; shirt: THREE.Material; pants: THREE.Material }): THREE.Group {
  // Chibi proportions: round head about as wide as the body.
  const g = new THREE.Group()
  const leg = new THREE.CapsuleGeometry(0.085, 0.22, 4, 10)
  const arm = new THREE.CapsuleGeometry(0.07, 0.22, 4, 10)
  const add = (geos: THREE.BufferGeometry[], material: THREE.Material, cast = true) => {
    const mesh = new THREE.Mesh(mergeGeometries(geos), material)
    mesh.castShadow = cast
    g.add(mesh)
  }
  add([at(leg, -0.11, 0.2, 0), at(leg, 0.11, 0.2, 0)], m.pants)
  add([at(new THREE.CapsuleGeometry(0.22, 0.2, 6, 14), 0, 0.64, 0), at(arm, -0.29, 0.62, 0), at(arm, 0.29, 0.62, 0)], m.shirt)
  const hand = new THREE.SphereGeometry(0.075, 10, 8)
  add([at(new THREE.SphereGeometry(0.34, 20, 16), 0, 1.15, 0), at(hand, -0.29, 0.43, 0), at(hand, 0.29, 0.43, 0)], m.skin)
  // Hair cap (top part of a slightly larger sphere) + two eyes, same dark color.
  const cap = new THREE.SphereGeometry(0.36, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.42)
  const eye = new THREE.SphereGeometry(0.045, 8, 6)
  add([at(cap, 0, 1.17, -0.01), at(eye, -0.12, 1.12, 0.31), at(eye, 0.12, 1.12, 0.31)], m.hair)
  return g
}

export function buildScene(scene: THREE.Scene): SpikeScene {
  const m = {
    floor: mat(),
    wall: mat(),
    rackBody: mat(),
    rackTop: mat(),
    tray: mat(),
    skin: mat(),
    hair: mat(),
    shirt: mat(),
    pants: mat(),
    grid: new THREE.LineBasicMaterial(),
    led: new THREE.MeshBasicMaterial({ color: 0xffffff }), // tinted per instance
  }
  const half = ROOM_SIZE / 2

  // Base slab (floor) with rounded edges; top surface at y = 0.
  const slab = new THREE.Mesh(rounded(ROOM_SIZE + 0.4, 0.4, ROOM_SIZE + 0.4, 0.15, 3), m.floor)
  slab.position.set(0, -0.2, 0)
  slab.receiveShadow = true
  scene.add(slab)
  scene.add(gridLines(m.grid))

  // Back + left wall merged into one mesh.
  const t = 0.25
  const walls = new THREE.Mesh(
    mergeGeometries([
      at(rounded(ROOM_SIZE + 0.4, WALL_HEIGHT, t, 0.1, 3), 0, WALL_HEIGHT / 2, -half - t / 2),
      at(rounded(t, WALL_HEIGHT, ROOM_SIZE + 0.4, 0.1, 3), -half - t / 2, WALL_HEIGHT / 2, 0),
    ]),
    m.wall,
  )
  walls.receiveShadow = true
  scene.add(walls)

  // Racks: body, top cap, trays and LEDs are each one InstancedMesh.
  const bodyPos = RACK_X.map((x) => new THREE.Vector3(x, RACK_H / 2, RACK_Z))
  const topPos = RACK_X.map((x) => new THREE.Vector3(x, RACK_H + 0.04, RACK_Z))
  const trayPos: THREE.Vector3[] = []
  const ledPos: THREE.Vector3[] = []
  for (const x of RACK_X) {
    for (let i = 0; i < TRAYS_PER_RACK; i++) {
      const y = 0.4 + i * 0.4
      trayPos.push(new THREE.Vector3(x, y, RACK_Z + RACK_D / 2 + 0.02))
      ledPos.push(new THREE.Vector3(x + RACK_W / 2 - 0.19, y, RACK_Z + RACK_D / 2 + 0.07))
    }
  }
  const bodies = instanced(rounded(RACK_W, RACK_H, RACK_D, 0.06), m.rackBody, bodyPos)
  bodies.castShadow = true
  bodies.receiveShadow = true
  bodies.userData.perRack = 1
  const tops = instanced(rounded(RACK_W + 0.06, 0.1, RACK_D + 0.06, 0.04), m.rackTop, topPos)
  tops.castShadow = true
  const trays = instanced(rounded(RACK_W - 0.1, 0.28, 0.06, 0.025), m.tray, trayPos)
  trays.userData.perRack = TRAYS_PER_RACK
  // LED about twice the S1 size (0.09 -> 0.18).
  const leds = instanced(rounded(0.18, 0.18, 0.05, 0.03), m.led, ledPos)
  leds.userData.perRack = TRAYS_PER_RACK
  const green = new THREE.Color(LED_GREEN)
  const red = new THREE.Color(LED_RED)
  for (let i = 0; i < ledPos.length; i++) leds.setColorAt(i, green)
  scene.add(bodies, tops, trays, leds)

  const broken = RACK_X.map(() => false)
  const toggleRack = (index: number) => {
    broken[index] = !broken[index]
    for (let i = 0; i < TRAYS_PER_RACK; i++) leds.setColorAt(index * TRAYS_PER_RACK + i, broken[index] ? red : green)
    if (leds.instanceColor) leds.instanceColor.needsUpdate = true
  }

  const tech = buildTechnician(m)
  tech.position.set(2.5, 0, -2.3)
  tech.rotation.y = Math.PI / 4 // face the camera
  scene.add(tech)

  const hemi = new THREE.HemisphereLight()
  scene.add(hemi)
  const sun = new THREE.DirectionalLight(0xffffff)
  sun.position.set(5, 10, 6)
  sun.castShadow = true
  sun.shadow.mapSize.set(1024, 1024)
  const s = sun.shadow.camera
  s.left = -8
  s.right = 8
  s.top = 8
  s.bottom = -8
  s.near = 1
  s.far = 30
  sun.shadow.bias = -0.0005
  scene.add(sun)

  const applyTheme = (th: Theme) => {
    scene.background = new THREE.Color(th.background)
    m.floor.color.set(th.floor)
    m.grid.color.set(th.grid)
    m.wall.color.set(th.wall)
    m.rackBody.color.set(th.rackBody)
    m.rackTop.color.set(th.rackTop)
    m.tray.color.set(th.tray)
    m.skin.color.set(th.skin)
    m.hair.color.set(th.hair)
    m.shirt.color.set(th.shirt)
    m.pants.color.set(th.pants)
    hemi.color.set(th.hemiSky)
    hemi.groundColor.set(th.hemiGround)
    hemi.intensity = th.hemiIntensity
    sun.intensity = th.sunIntensity
  }

  return { pickables: [bodies, trays, leds], toggleRack, applyTheme }
}
