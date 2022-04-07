import { config } from './constants'
var tc = require("tinycolor2");

const { squareSize, barSize, crossSize } = config
var gradient = require('gradient-parser');

export function getHandleValue(e) {
  const { offsetLeft } = safeBounds(e);
  let pos = e.clientX - offsetLeft - barSize / 2;
  let bounded = formatInputValues(pos, 0, 276)
  return Math.round(bounded / 2.76)
}

export function computeSquareXY(hsl) {
  const s = hsl[1] * 100
  const l = hsl[2] * 100
  const t = (s * (l < 50 ? l : 100 - l)) / 100
  const s1 = Math.round((200 * t) / (l + t)) | 0
  const b1 = Math.round(t + l)
  const x = (squareSize / 100) * s1 - crossSize / 2
  const y = squareSize - (squareSize / 100) * b1 - crossSize / 2
  return [x, y]
}

export function computePickerPosition(e) {
  const { offsetLeft, offsetTop } = safeBounds(e)
  const getX = () => {
    let xPos = e.clientX - offsetLeft - crossSize / 2
    return formatInputValues(xPos, -8, 284)
  }
  const getY = () => {
    let yPos = e.clientY - offsetTop - crossSize / 2
    return formatInputValues(yPos, -8, 284)
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

export const getNewHsl = (newHue, s, l, o) => {
  let tiny = tc({h: newHue, s: s, l: l})
  let { r, g, b } = tiny.toRgb();
  return `rgba(${r}, ${g}, ${b}, ${o})`
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

export const formatInputValues = (value, min, max) => {
  return isNaN(value) ? min : value < min ? min : value > max ? max : value;
}

export const rgbInputSwitch = (type, newValue, r, g, b, a) => {
  if (type === 'r') {
    return `rgba(${newValue}, ${g}, ${b}, ${a})`
  } else if (type === 'g') {
    return `rgba(${r}, ${newValue}, ${b}, ${a})`
  } else {
    return `rgba(${r}, ${g}, ${newValue}, ${a})`
  }
}

export const safeBounds = (e) => {
  let client = e.target.parentNode.getBoundingClientRect();
  return { offsetLeft: client?.x, offsetTop: client?.y}
}
