import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import {
  getNewHsl,
  getDegrees,
  isUpperCase,
  getHandleValue,
  getGradientType,
  computeSquareXY,
  compareGradients,
  computePickerPosition,
} from './utils/utils.js'
import { low, high, getColors } from './utils/formatters.js'
import { config } from './constants.js'
import { ColorsProps, GradientProps } from './shared/types.js'
import tinycolor from 'tinycolor2'

const { crossSize } = config
const PickerContext = createContext<PickerContextProps | null>(null)

export default function PickerContextWrapper({
  value,
  bounds,
  children,
  onChange,
  squareSize,
  hideOpacity,
  squareHeight,
}: PickerContextWrapperProps) {
  const offsetLeft = bounds?.x
  const isGradient = value?.includes('gradient')
  const gradientType = getGradientType(value)
  const degrees = getDegrees(value)
  const degreeStr =
    gradientType === 'linear-gradient' ? `${degrees}deg` : 'circle'
  const colors = getColors(value)
  const indexedColors = colors?.map((c: ColorsProps, i: number) => ({
    ...c,
    index: i,
  }))
  const currentColorObj =
    indexedColors?.filter((c: ColorsProps) => isUpperCase(c.value))[0] ||
    indexedColors[0]
  const currentColor = currentColorObj?.value
  const selectedColor = currentColorObj?.index
  const currentLeft = currentColorObj?.left
  const [tinyColor, setTinyColor] = useState(tinycolor(currentColor))
  const [inputType, setInputType] = useState('rgb')
  const { r, g, b, a: opacity } = tinyColor.toRgb()
  const { h: hue, s, l } = tinyColor.toHsl()
  const { s: hsvS, v: hsvV } = tinyColor.toHsv()
  const [internalHue, setInternalHue] = useState<number>(Math.round(hue))
  const [x, y] = computeSquareXY([hue, s, l], squareSize, squareHeight)
  const [previousColors, setPreviousColors] = useState<string[]>([])
  const [previousGraidents, setPreviousGradients] = useState<string[]>([])
  const [inFocus, setInFocus] = useState<string | null>(null)
  const useragent = navigator.userAgent || ''
  const isMobile = useragent?.includes('Mobile')

  const internalOnChange = (newValue: string) => {
    if (newValue !== value) {
      if (isGradient) {
        if (!compareGradients(previousGraidents[0] || '', value)) {
          setPreviousGradients([value, ...previousGraidents.slice(0, 8)])
        }
      } else {
        setPreviousColors([value, ...previousColors.slice(0, 8)])
      }

      onChange(newValue)
    }
  }

  useEffect(() => {
    setTinyColor(tinycolor(currentColor))
  }, [currentColor])

  const createGradientStr = (newColors: GradientProps[]) => {
    const sorted = newColors.sort(
      (a: GradientProps, b: GradientProps) => a.left - b.left
    )
    const colorString = sorted?.map((cc: any) => `${cc?.value} ${cc.left}%`)
    internalOnChange(`${gradientType}(${degreeStr}, ${colorString.join(', ')})`)
  }

  const handleGradient = (newColor: string, left?: number) => {
    const remaining = colors?.filter(
      (c: GradientProps) => !isUpperCase(c.value)
    )
    const newColors = [
      { value: newColor.toUpperCase(), left: left || currentLeft },
      ...remaining,
    ]
    createGradientStr(newColors)
  }

  const handleChange = (newColor: string) => {
    if (isGradient) {
      handleGradient(newColor)
    } else {
      internalOnChange(newColor)
    }
  }

  const handleOpacity = (e: any) => {
    const newO = getHandleValue(e) / 100
    const newColor = `rgba(${r}, ${g}, ${b}, ${newO})`
    handleChange(newColor)
  }

  const handleHue = (e: any) => {
    const newHue = getHandleValue(e) * 3.6
    const newHsl = getNewHsl(newHue, s, l, opacity, setInternalHue)
    handleChange(newHsl)
  }

  const handleColor = (e: any, ctx: any) => {
    const [x, y] = computePickerPosition(e)
    if (x && y) {
      const x1 = Math.min(x + crossSize / 2, squareSize - 1)
      const y1 = Math.min(y + crossSize / 2, squareHeight - 1)
      const [r, g, b] = ctx.getImageData(x1, y1, 1, 1).data
      const rgbaData = `rgba(${r}, ${g}, ${b}, ${opacity})`
      const newTc = tinycolor(rgbaData)
      // @ts-expect-error some problem with certain tinycolor functions when importing module
      const newHsl = newTc.toHsl(newTc)
      const fixedH = tinycolor({
        h: hue,
        s: newHsl?.s,
        l: newHsl?.l,
        a: newHsl?.a,
      })
      handleChange(
        // @ts-expect-error some problem with certain tinycolor functions when importing module
        `rgba(${fixedH?._r}, ${fixedH?._g}, ${fixedH?._b}, ${fixedH?._a})`
      )
    }
  }

  const setSelectedColor = (index: number) => {
    const newGradStr = colors?.map((cc: ColorsProps, i: number) => ({
      ...cc,
      value: i === index ? high(cc) : low(cc),
    }))
    createGradientStr(newGradStr)
  }

  const addPoint = (e: any) => {
    const left = getHandleValue(e)
    const newColors = [
      ...colors.map((c: any) => ({ ...c, value: low(c) })),
      { value: currentColor, left: left },
    ]?.sort((a, b) => a.left - b.left)
    createGradientStr(newColors)
  }

  const deletePoint = () => {
    if (colors?.length > 2) {
      const formatted = colors?.map((fc: GradientProps, i: number) => ({
        ...fc,
        value: i === selectedColor - 1 ? high(fc) : low(fc),
      }))
      const remaining = formatted?.filter(
        (_: any, i: number) => i !== selectedColor
      )
      createGradientStr(remaining)
    }
  }

  const nextPoint = () => {
    if (selectedColor !== colors?.length - 1) {
      setSelectedColor(selectedColor + 1)
    }
  }

  const handleClickFocus = (e: any) => {
    const formattedPath = e?.path?.map((el: any) => el.id)

    if (formattedPath?.includes('gradient-bar')) {
      setInFocus('gpoint')
    } else if (formattedPath?.includes('rbgcp-input')) {
      setInFocus('input')
    } else if (formattedPath?.includes('rbgcp-wrapper')) {
      setInFocus('picker')
    } else {
      setInFocus(null)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClickFocus)
    // window.addEventListener('keydown', handleKeyboard)

    return () => {
      window.removeEventListener('click', handleClickFocus)
      // window.removeEventListener('keydown', handleKeyboard)
    }
  }, [inFocus, value])

  const pickerContext = {
    x,
    y,
    s,
    l,
    r,
    g,
    b,
    hue,
    hsvS,
    hsvV,
    value,
    colors,
    degrees,
    inFocus,
    opacity,
    isMobile,
    onChange,
    addPoint,
    inputType,
    nextPoint,
    tinyColor,
    handleHue,
    setInFocus,
    isGradient,
    offsetLeft,
    squareSize,
    hideOpacity,
    handleColor,
    currentLeft,
    deletePoint,
    internalHue,
    squareHeight,
    setInputType,
    gradientType,
    handleChange,
    currentColor,
    selectedColor,
    handleOpacity,
    setInternalHue,
    previousColors,
    handleGradient,
    setSelectedColor,
    internalOnChange,
    previousGraidents,
  }

  return (
    <PickerContext.Provider value={pickerContext}>
      {children}
    </PickerContext.Provider>
  )
}

export function usePicker() {
  const pickerContext = useContext(PickerContext)

  if (!pickerContext) {
    throw new Error('usePicker has to be used within <PickerContext.Provider>')
  }

  return pickerContext
}

type PickerContextWrapperProps = {
  bounds: any
  value: string
  squareSize: number
  children: ReactNode
  squareHeight: number
  hideOpacity: boolean
  onChange: (arg0: string) => void
}

export type PickerContextProps = {
  x?: number
  y?: number
  s: number
  l: number
  r: number
  g: number
  b: number
  hue: number
  hsvS: number
  hsvV: number
  value: string
  colors: string[]
  degrees: number
  inFocus: string | null
  opacity: number
  isMobile: boolean
  onChange: (arg0: string) => void
  addPoint: (arg0: any) => void
  inputType: string
  nextPoint: () => void
  tinyColor: any
  handleHue: (arg0: any) => void
  setInFocus: (arg0: string | null) => void
  isGradient: boolean
  offsetLeft: number
  squareSize: number
  hideOpacity: boolean
  handleColor: (arg0: any, arg1: any) => void
  currentLeft: number
  deletePoint: () => void
  internalHue: number
  squareHeight: number
  setInputType: (arg0: string) => void
  gradientType?: string
  handleChange: (arg0: string) => void
  currentColor: string
  selectedColor: number
  handleOpacity: (arg0: any) => void
  setInternalHue: (arg0: number) => void
  previousColors: string[]
  handleGradient: (arg0: string, arg1: number) => void
  setSelectedColor: (arg0: number) => void
  internalOnChange: (arg0: string) => void
  previousGraidents: string[]
}
