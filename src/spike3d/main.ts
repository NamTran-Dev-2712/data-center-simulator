// Spike only: isometric camera, pan/zoom/tap controls, theme toggle and FPS HUD.
import * as THREE from 'three'
import { buildScene, ROOM_SIZE, WALL_HEIGHT } from './scene'
import { DARK, LIGHT, type Theme } from './themes'

const canvas = document.getElementById('view') as HTMLCanvasElement
const hud = document.getElementById('hud') as HTMLDivElement
const themeBtn = document.getElementById('theme') as HTMLButtonElement

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

const scene = new THREE.Scene()
const world = buildScene(scene)

// --- Theme ---
let theme: Theme = LIGHT
function setTheme(th: Theme): void {
  theme = th
  world.applyTheme(th)
  document.body.dataset.theme = th.name
  themeBtn.textContent = th.name === 'light' ? 'Dark' : 'Light'
}
themeBtn.addEventListener('click', () => setTheme(theme === LIGHT ? DARK : LIGHT))
setTheme(LIGHT)

// --- Camera: orthographic, true isometric angle ---
const VIEW_HEIGHT = 12 // world units visible vertically at zoom 1
const PAN_LIMIT = ROOM_SIZE / 2
const OFFSET = new THREE.Vector3(20, 20, 20)
const target = new THREE.Vector3()
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
let zoomMin = 0.5
let zoomMax = 3

function placeCamera(): void {
  target.x = THREE.MathUtils.clamp(target.x, -PAN_LIMIT, PAN_LIMIT)
  target.z = THREE.MathUtils.clamp(target.z, -PAN_LIMIT, PAN_LIMIT)
  camera.position.copy(target).add(OFFSET)
  camera.lookAt(target)
  camera.updateMatrixWorld()
}

function setZoom(z: number): void {
  camera.zoom = THREE.MathUtils.clamp(z, zoomMin, zoomMax)
  camera.updateProjectionMatrix()
}

/** Center the room and zoom so the whole room fits (width-limited on a portrait screen). */
function fitRoom(): void {
  target.set(0, 0, 0)
  placeCamera()
  const h = ROOM_SIZE / 2 + 0.25
  const box = new THREE.Box3()
  const p = new THREE.Vector3()
  for (const x of [-h, h]) for (const y of [-0.4, WALL_HEIGHT]) for (const z of [-h, h]) {
    box.expandByPoint(p.set(x, y, z).applyMatrix4(camera.matrixWorldInverse))
  }
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  // Move the view center onto the room center, staying on the ground plane.
  const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0)
  const up = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1)
  const shift = right.multiplyScalar(center.x).add(up.multiplyScalar(center.y))
  const ray = new THREE.Ray(camera.position.clone().add(shift), camera.getWorldDirection(new THREE.Vector3()))
  ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), target)
  placeCamera()

  const frustumW = camera.right - camera.left
  const frustumH = camera.top - camera.bottom
  const fit = Math.min(frustumW / size.x, frustumH / size.y) * 0.96
  zoomMin = fit * 0.8
  zoomMax = fit * 4
  setZoom(fit)
}

function resize(): void {
  const w = window.innerWidth
  const h = window.innerHeight
  renderer.setSize(w, h, false)
  const aspect = w / h
  camera.left = (-VIEW_HEIGHT * aspect) / 2
  camera.right = (VIEW_HEIGHT * aspect) / 2
  camera.top = VIEW_HEIGHT / 2
  camera.bottom = -VIEW_HEIGHT / 2
  camera.updateProjectionMatrix()
  fitRoom()
}

// --- Picking helpers ---
const raycaster = new THREE.Raycaster()
const ndc = new THREE.Vector2()
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)

function setRay(clientX: number, clientY: number): void {
  const rect = canvas.getBoundingClientRect()
  ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1)
  raycaster.setFromCamera(ndc, camera)
}

function groundPoint(clientX: number, clientY: number, out: THREE.Vector3): boolean {
  setRay(clientX, clientY)
  return raycaster.ray.intersectPlane(groundPlane, out) !== null
}

function rackIndexAt(clientX: number, clientY: number): number | undefined {
  setRay(clientX, clientY)
  const hit = raycaster.intersectObjects(world.pickables, false)[0]
  if (!hit || hit.instanceId === undefined) return undefined
  return Math.floor(hit.instanceId / (hit.object.userData.perRack as number))
}

// --- Input: 1 pointer = pan, 2 pointers = pinch zoom, short tap = toggle LEDs ---
const TAP_THRESHOLD_PX = 8
const pointers = new Map<number, { x: number; y: number }>()
let gestureMoved = 0
let gestureMulti = false
let pinchDist = 0
const prevGround = new THREE.Vector3()
const curGround = new THREE.Vector3()

function pinchDistance(): number {
  const [a, b] = [...pointers.values()]
  return Math.hypot(a.x - b.x, a.y - b.y)
}

canvas.addEventListener('pointerdown', (e) => {
  canvas.setPointerCapture(e.pointerId)
  if (pointers.size === 0) {
    gestureMoved = 0
    gestureMulti = false
  }
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
  if (pointers.size === 2) {
    gestureMulti = true
    pinchDist = pinchDistance()
  }
})

canvas.addEventListener('pointermove', (e) => {
  const p = pointers.get(e.pointerId)
  if (!p) return
  gestureMoved += Math.hypot(e.clientX - p.x, e.clientY - p.y)

  if (pointers.size === 1 && gestureMoved > TAP_THRESHOLD_PX) {
    // Keep the ground point under the finger fixed while dragging.
    if (groundPoint(p.x, p.y, prevGround) && groundPoint(e.clientX, e.clientY, curGround)) {
      target.add(prevGround.sub(curGround))
      placeCamera()
    }
  }
  p.x = e.clientX
  p.y = e.clientY

  if (pointers.size === 2) {
    const d = pinchDistance()
    if (pinchDist > 0) setZoom(camera.zoom * (d / pinchDist))
    pinchDist = d
  }
})

function endPointer(e: PointerEvent, allowTap: boolean): void {
  if (!pointers.has(e.pointerId)) return
  pointers.delete(e.pointerId)
  if (allowTap && pointers.size === 0 && !gestureMulti && gestureMoved <= TAP_THRESHOLD_PX) {
    const index = rackIndexAt(e.clientX, e.clientY)
    if (index !== undefined) world.toggleRack(index)
  }
  if (pointers.size < 2) pinchDist = 0
}
canvas.addEventListener('pointerup', (e) => endPointer(e, true))
canvas.addEventListener('pointercancel', (e) => endPointer(e, false))

canvas.addEventListener(
  'wheel',
  (e) => {
    e.preventDefault()
    setZoom(camera.zoom * Math.exp(-e.deltaY * 0.0015))
  },
  { passive: false },
)

window.addEventListener('resize', resize)
resize()

// --- Loop + HUD ---
// avg = frames rendered in the last 1 s; min = slowest single frame in the last 5 s, as FPS.
const frameTimes: number[] = [] // [timestamp, duration] pairs, flattened
let lastFrame = performance.now()
let lastHud = 0
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera)
  const now = performance.now()
  frameTimes.push(now, now - lastFrame)
  lastFrame = now
  while (frameTimes.length > 0 && frameTimes[0] < now - 5000) frameTimes.splice(0, 2)

  if (now - lastHud >= 250) {
    lastHud = now
    let count1s = 0
    let worst = 0
    for (let i = 0; i < frameTimes.length; i += 2) {
      if (frameTimes[i] >= now - 1000) count1s++
      worst = Math.max(worst, frameTimes[i + 1])
    }
    const minFps = worst > 0 ? Math.round(1000 / worst) : 0
    hud.textContent = `FPS ${count1s} · min(5s) ${minFps}\nDraw calls ${renderer.info.render.calls}`
  }
})
