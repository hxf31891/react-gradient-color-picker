import { formatInputValues } from './formatters.js'
import { config } from '../constants.js'
import tc from 'tinycolor2'
import { ThemeProps } from '../shared/types.js'

const { barSize, crossSize } = config

export const safeBounds = (e: any) => {
  const client = e.target.parentNode.getBoundingClientRect()
  const className = e.target.className
  const adjuster = className === 'c-resize ps-rl' ? 15 : 0
  return {
    offsetLeft: client?.x + adjuster,
    offsetTop: client?.y,
    clientWidth: client?.width,
    clientHeight: client?.height,
  }
}

export function getHandleValue(e: any) {
  const { offsetLeft, clientWidth } = safeBounds(e)
  const pos = e.clientX - offsetLeft - barSize / 2
  const adjuster = clientWidth - 18
  const bounded = formatInputValues(pos, 0, adjuster)
  return Math.round(bounded / (adjuster / 100))
}

export function computeSquareXY(
  hsl: number[],
  squareSize: number,
  squareHeight: number
) {
  if (hsl[1] && hsl[2]) {
    const s = hsl[1] * 100
    const l = hsl[2] * 100
    const t = (s * (l < 50 ? l : 100 - l)) / 100
    const s1 = Math.round((200 * t) / (l + t)) | 0
    const b1 = Math.round(t + l)
    const x = (squareSize / 100) * s1 - crossSize / 2
    const y = squareHeight - (squareHeight / 100) * b1 - crossSize / 2
    return [x, y]
  } else {
    return [0, 0]
  }
}

const getClientXY = (e: any) => {
  if (e.clientX) {
    return { clientX: e.clientX, clientY: e.clientY }
  } else {
    const touch = e.touches[0] || {}
    return { clientX: touch.clientX, clientY: touch.clientY }
  }
}

export function computePickerPosition(e: any) {
  const { offsetLeft, offsetTop, clientWidth, clientHeight } = safeBounds(e)
  const { clientX, clientY } = getClientXY(e)
  const getX = () => {
    const xPos = clientX - offsetLeft - crossSize / 2
    return formatInputValues(xPos, -9, clientWidth - 10)
  }
  const getY = () => {
    const yPos = clientY - offsetTop - crossSize / 2
    return formatInputValues(yPos, -9, clientHeight - 10)
  }

  return [getX(), getY()]
}

export const getGradientType = (value: string) => {
  return value?.split('(')[0]
}

export const getNewHsl = (
  newHue: number,
  s: number,
  l: number,
  o: number,
  setInternalHue: (arg0: number) => void
) => {
  setInternalHue(newHue)
  const tiny = tc({ h: newHue, s: s, l: l })
  const { r, g, b } = tiny.toRgb()
  return `rgba(${r}, ${g}, ${b}, ${o})`
}

export const isUpperCase = (str: string) => {
  return str?.[0] === str?.[0]?.toUpperCase()
}

export const compareGradients = (g1: string, g2: string) => {
  const ng1 = g1?.toLowerCase()?.replaceAll(' ', '')
  const ng2 = g2?.toLowerCase()?.replaceAll(' ', '')
  if (ng1 === ng2) {
    return true
  } else {
    return false
  }
}

const convertShortHandDeg = (dir: any) => {
  if (dir === 'to top') {
    return 0
  } else if (dir === 'to bottom') {
    return 180
  } else if (dir === 'to left') {
    return 270
  } else if (dir === 'to right') {
    return 90
  } else if (dir === 'to top right') {
    return 45
  } else if (dir === 'to bottom right') {
    return 135
  } else if (dir === 'to bottom left') {
    return 225
  } else if (dir === 'to top left') {
    return 315
  } else {
    const safeDir = dir || 0
    return parseInt(safeDir)
  }
}

export const getDegrees = (value: string) => {
  const s1 = value?.split(',')[0]
  const s2 = s1?.split('(')[1]?.replace('deg', '')
  return convertShortHandDeg(s2)
}

export const objectToString = (value: any) => {
  if (typeof value === 'string') {
    return value
  } else {
    if (value?.type?.includes('gradient')) {
      const sorted = value?.colorStops?.sort(
        (a: any, b: any) => a?.left - b?.left
      )
      const string = sorted
        ?.map((c: any) => `${c?.value} ${c?.left}%`)
        ?.join(', ')
      const type = value?.type
      const degs = convertShortHandDeg(value?.orientation?.value)
      const gradientStr = type === 'linear-gradient' ? `${degs}deg` : 'circle'
      return `${type}(${gradientStr}, ${string})`
    } else {
      const color = value?.colorStops[0]?.value || 'rgba(175, 51, 242, 1)'
      return color
    }
  }
}

// export const validateTheme = (allowDark: boolean, theme?: ThemeProps) => {
//   let isDarkMode: any = ''
//
//   if (typeof window !== 'undefined' && allowDark) {
//     isDarkMode =
//       window.matchMedia &&
//       window.matchMedia('(prefers-color-scheme: dark)').matches
//   }
//
//   const processedTheme = {
//     light: {
//       color: theme?.light?.color || defaultLight?.color,
//       background: theme?.light?.background || defaultLight?.background,
//       highlights: theme?.light?.highlights || defaultLight?.highlights,
//       accent: theme?.light?.accent || defaultLight?.accent,
//     },
//     dark: {
//       color: theme?.dark?.color || defaultDark?.color,
//       background: theme?.dark?.background || defaultDark?.background,
//       highlights: theme?.dark?.highlights || defaultDark?.highlights,
//       accent: theme?.dark?.accent || defaultDark?.accent,
//     },
//   }
//
//   if (isDarkMode === 'dark' && allowDark) {
//     return processedTheme?.dark
//   } else {
//     return processedTheme?.light
//   }
// }
