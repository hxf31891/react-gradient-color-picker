import { config } from '../constants'
import { gradientParser } from './gradientParser'

const { defaultColor, defaultGradient } = config

export const low = (color) => {
  return color.value.toLowerCase()
}

export const high = (color) => {
  return color.value.toUpperCase()
}

export const getColors = (value) => {
  let isGradient = value?.includes('gradient')
  if (isGradient) {
    let isConic = value?.includes('conic')
    let safeValue = !isConic && validate(value) ? value : defaultGradient
    if (isConic) {
      console.log('Sorry we cant handle conic gradients yet')
    }
    var obj = gradientParser(safeValue)
    return obj?.colorStops
  } else {
    let safeValue = validate(value) ? value : defaultColor
    return [{ value: safeValue }]
  }
}

let validate = (c) => {
  // let img = window?.document?.createElement('img')
  // img.style = 'background: rgb(0, 0, 0)'
  // img.style = 'background: ' + c
  // if (img.style.background !== 'rgb(0, 0, 0)' && img.style.background !== '')
  //   return true
  // img.style = 'background: rgb(255, 255, 255)'
  // img.style = 'background: ' + c
  // return (
  //   img.style.background !== 'rgb(255, 255, 255)' && img.style.background !== ''
  // )
  return true
}

export const formatInputValues = (value, min, max) => {
  return isNaN(value) ? min : value < min ? min : value > max ? max : value
}
