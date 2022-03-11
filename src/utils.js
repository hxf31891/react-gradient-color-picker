import { config } from './constants'
const { squareSize, barSize, crossSize, defaultColor } = config
var convert = require('color-convert');
var gradient = require('gradient-parser');

export function computeBarPosition(e, offsetLeft) {
  let pos = e.clientX - offsetLeft - barSize / 2 - 1
  return pos < -7 ? -7 : pos > 287 ? 287 : pos
}

export function computeHue(x) {
  return Math.round((x + barSize / 2) * (360 / squareSize))
}

export function computeOpacity(x) {
  let o = Math.round(x / 2.80)
  return o < 0 ? 0 : o > 100 ? 100 : o
}

export function computeHueX(h) {
  return Math.round((squareSize / 360) * h - barSize / 2)
}

export function computeSquareXY(color = defaultColor) {
  const hsl = getHsl(color)
  const s = hsl[1]
  const l = hsl[2]
  const t = (s * (l < 50 ? l : 100 - l)) / 100
  const s1 = Math.round((200 * t) / (l + t)) | 0
  const b1 = Math.round(t + l)
  const x = (squareSize / 100) * s1 - crossSize / 2
  const y = squareSize - (squareSize / 100) * b1 - crossSize / 2
  return [x, y]
}

export function computePickerPosition(e, offsetLeft, offsetTop) {
  const getX = () => {
    let xPos = e.clientX - offsetLeft - crossSize / 2
    return xPos < -8 ? -8 : xPos > 284 ? 284 : xPos
  }
  const getY = () => {
    let yPos = e.clientY - offsetTop - crossSize / 2
    return yPos < -8 ? -8 : yPos > 284 ? 284 : yPos
  }

  return [getX(), getY()]
}

export const getDegrees = (value) => {
  let s1 = value?.split(',')[0]
  return parseInt(s1?.split('(')[1]?.slice(0,-3))
}

export const getGradientType = (value) => {
  return value?.split('(')[0]
}

export const getRGBValues = (color = defaultColor) => {
  let strs = color?.split('(')[1]?.slice(0,-1)?.split(',')
  return strs?.map(v => parseFloat(v))
}

export const getHsl = (color = defaultColor) => {
  let nums = getRGBValues(color)
  let hsl = convert.rgb.hsl(nums[0], nums[1], nums[2])
  return hsl
}

export const getHue = (color = defaultColor) => {
  let hsl = getHsl(color)
  return hsl[0]
}

export const getHex = (color = defaultColor) => {
  let nums = getRGBValues(color)
  return convert.rgb.hex(nums[0], nums[1], nums[2])
}

export const getNewHsl = (newHue, s, l, o) => {
  let hsl = convert.hsl.rgb(newHue, s, l)
  return `rgba(${hsl[0]}, ${hsl[1]}, ${hsl[2]}, ${o})`
}

export const getOpacity = (color = defaultColor) => {
  let rgba = getRGBValues(color)
  return rgba[3]
}

export const getColors = (value) => {
  let isGradient = value?.includes('gradient')
  if (isGradient) {
    var obj = gradient.parse(value);
    return obj[0]?.colorStops?.map((c) => ({value: `rgba(${c.value[0]}, ${c.value[1]}, ${c.value[2]}, ${c.value[3]})`, left: parseInt(c.length?.value) }))
  } else {
    return [{ value: value }]
  }
}
