// Spike only: two color themes for the 3D test page.

export interface Theme {
  name: 'light' | 'dark'
  background: number
  floor: number
  grid: number
  wall: number
  rackBody: number
  rackTop: number
  tray: number
  skin: number
  hair: number
  shirt: number
  pants: number
  hemiSky: number
  hemiGround: number
  hemiIntensity: number
  sunIntensity: number
}

const tech = { skin: 0xf0c39a, hair: 0x3a2a22, shirt: 0x2f6fd6, pants: 0x1d447f }

export const LIGHT: Theme = {
  name: 'light',
  background: 0xe6eaf2,
  floor: 0xb9b5d0,
  grid: 0xa29ec0,
  wall: 0xdde2ee,
  rackBody: 0x8ea3c2,
  rackTop: 0x7487a8,
  tray: 0x3d4860,
  ...tech,
  hemiSky: 0xffffff,
  hemiGround: 0x9a98b5,
  hemiIntensity: 1.5,
  sunIntensity: 1.5,
}

// Same colors as the S1 spike (ART_BIBLE dark palette).
export const DARK: Theme = {
  name: 'dark',
  background: 0x0f1420,
  floor: 0x46506a,
  grid: 0x3d4860,
  wall: 0x34405a,
  rackBody: 0x2a3347,
  rackTop: 0x3d4860,
  tray: 0x5b6882,
  ...tech,
  hemiSky: 0xeef1f7,
  hemiGround: 0x2a3347,
  hemiIntensity: 1.6,
  sunIntensity: 1.6,
}

export const LED_GREEN = 0x3ddc84
export const LED_RED = 0xff4d4d
