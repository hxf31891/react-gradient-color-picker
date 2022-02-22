import { config } from './constants'
const { squareSize, barSize, crossSize } = config
var convert = require('color-convert');
var gradient = require('gradient-parser');

export const hsl2rgb = (h,s,l, alpha) => {
   let a=s*Math.min(l,1-l);
   let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
   return `rgba(${f(0) * 255}, ${f(8) * 255}, ${f(4) * 255}, ${alpha})`
}

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

export function computeSquareXY(color) {
  const hsl = getHsl(color)
  const s = hsl[1]
  const l = hsl [2]
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

export const getRGBValues = (color) => {
  let strs = color?.split('(')[1]?.slice(0,-1)?.split(',')
  return strs?.map(v => parseFloat(v))
}

export const getHsl = (color) => {
  let nums = getRGBValues(color)
  let safeNums = nums?.length > 0 ? nums : [{}, {}, {}]
  let hsl = convert.rgb.hsl(safeNums[0], safeNums[1], safeNums[2])
  return hsl
}

export const getHue = (color) => {
  let hsl = getHsl(color)
  let safeHsl = hsl?.length > 0 ? nums : [{}]
  return safeHsl[0]
}

export const getHex = (color) => {
  let nums = getRGBValues(color)
  let safeNums = nums?.length > 0 ? nums : [{}, {}, {}]
  return convert.rgb.hex(safeNums[0], safeNums[1], safeNums[2])
}

export const getNewHsl = (newHue, s, l, o) => {
  let hsl = convert.hsl.rgb(newHue, s, l)
  return `rgba(${hsl[0]}, ${hsl[1]}, ${hsl[2]}, ${o})`
}

export const getOpacity = (color) => {
  let rgba = getRGBValues(color)
  return rgba[3]
}

export const getColors = (value, isGradient) => {
  if (isGradient) {
    var obj = gradient.parse(value);
    return obj[0]?.colorStops?.map((c) => ({value: `rgba(${c.value[0]}, ${c.value[1]}, ${c.value[2]}, ${c.value[3]})`, left: parseInt(c.length?.value) }))
  } else {
    let arr = getRGBValues(value)
    return [{ value: value }]
  }
}
