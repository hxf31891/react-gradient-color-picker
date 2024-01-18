import { config } from '../constants.js'
import { ColorsProps } from '../shared/types.js'
import { gradientParser } from './gradientParser.js'

const { defaultColor, defaultGradient } = config

export const low = (color: ColorsProps) => {
  return color.value.toLowerCase()
}

export const high = (color: ColorsProps) => {
  return color.value.toUpperCase()
}

export const getColors = (value: string) => {
  const isGradient = value?.includes('gradient')
  if (isGradient) {
    const isConic = value?.includes('conic')
    const safeValue = !isConic ? value : defaultGradient
    if (isConic) {
      console.log('Sorry we cant handle conic gradients yet')
    }
    const obj = gradientParser(safeValue)
    return obj?.colorStops
  } else {
    const safeValue = value || defaultColor
    return [{ value: safeValue }]
  }
}

export const formatInputValues = (value: number, min: number, max: number) => {
  return isNaN(value) ? min : value < min ? min : value > max ? max : value
}

export const round = (val: number) => {
  return Math.round(val)
}
