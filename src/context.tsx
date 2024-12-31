import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { GradientProps, Styles, PassedConfig, Config } from './shared/types.js'
import { isUpperCase, getColorObj, getDetails } from './utils/utils.js'
import { low, high, getColors } from './utils/formatters.js'
import tinycolor from 'tinycolor2'

const PickerContext = createContext<PickerContextProps | null>(null)

export default function PickerContextWrapper({
  value,
  children,
  onChange,
  isDarkMode,
  squareWidth,
  hideOpacity,
  showHexAlpha,
  squareHeight,
  passedConfig,
  defaultStyles,
  pickerIdSuffix,
}: PCWProps) {
  const config: Config = {
    barSize: passedConfig.barSize ?? defaultConfig.barSize,
    crossSize: passedConfig.crossSize ?? defaultConfig.crossSize,
    defaultColor: passedConfig.defaultColor ?? defaultConfig.defaultColor,
    defaultGradient:
      passedConfig.defaultGradient ?? defaultConfig.defaultGradient,
  }

  const colors = getColors(value, config.defaultColor, config.defaultGradient)
  const { degrees, degreeStr, isGradient, gradientType } = getDetails(value)
  const { currentColor, selectedColor, currentLeft } = getColorObj(colors, config.defaultGradient)
  const [inputType, setInputType] = useState('rgb')
  const [previous, setPrevious] = useState({})
  const tinyColor = tinycolor(currentColor)
  const rgba = tinyColor.toRgb()
  const hsv = tinyColor.toHsv()
  const [hc, setHc] = useState({ ...rgba, ...hsv })

  useEffect(() => {
    if (hsv?.s === 0) {
      setHc({ ...rgba, ...hsv, h: hc?.h })
    } else {
      setHc({ ...rgba, ...hsv })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentColor])

  const createGradientStr = (newColors: GradientProps[]) => {
    const sorted = newColors.sort(
      (a: GradientProps, b: GradientProps) => a.left - b.left
    )
    const colorString = sorted?.map((cc: any) => `${cc?.value} ${cc.left}%`)
    const newGrade = `${gradientType}(${degreeStr}, ${colorString.join(', ')})`
    setPrevious({ ...previous, gradient: newGrade })
    onChange(newGrade)
  }

  const handleGradient = (newColor: string, left?: number) => {
    const remaining = colors?.filter(
      (c: GradientProps) => !isUpperCase(c.value)
    )
    const newColors = [
      { value: newColor.toUpperCase(), left: left ?? currentLeft },
      ...remaining,
    ]
    createGradientStr(newColors)
  }

  const handleChange = (newColor: string) => {
    if (isGradient) {
      handleGradient(newColor)
    } else {
      setPrevious({ ...previous, color: newColor })
      onChange(newColor)
    }
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

  const pickerContext = {
    hc,
    setHc,
    value,
    colors,
    config,
    degrees,
    onChange,
    previous,
    inputType,
    tinyColor,
    isDarkMode,
    isGradient,
    squareWidth,
    hideOpacity,
    currentLeft,
    deletePoint,
    showHexAlpha,
    squareHeight,
    setInputType,
    gradientType,
    handleChange,
    currentColor,
    selectedColor,
    defaultStyles,
    handleGradient,
    pickerIdSuffix,
    createGradientStr,
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

type PCWProps = {
  value: string
  squareWidth: number
  children: ReactNode
  squareHeight: number
  hideOpacity: boolean
  onChange: (arg0: string) => void
  defaultStyles: Styles
  isDarkMode: boolean
  pickerIdSuffix: string
  showHexAlpha: boolean
  passedConfig: PassedConfig
}

export type PickerContextProps = {
  hc: any
  config: Config
  value: string
  colors: GradientProps[]
  degrees: number
  onChange: (arg0: string) => void
  inputType: string
  tinyColor: any
  isGradient: boolean
  squareWidth: number
  hideOpacity: boolean
  currentLeft: number
  deletePoint: () => void
  squareHeight: number
  setInputType: (arg0: string) => void
  gradientType?: string
  handleChange: (arg0: string) => void
  currentColor: string
  selectedColor: number
  setHc: (arg0: any) => void
  handleGradient: (arg0: string, arg1?: number) => void
  createGradientStr: (arg0: GradientProps[]) => void
  defaultStyles: Styles
  previous: {
    color?: string
    gradient?: string
  }
  isDarkMode: boolean
  pickerIdSuffix: string
  showHexAlpha: boolean
}

const defaultConfig = {
  barSize: 18,
  crossSize: 18,
  inputSize: 40,
  delay: 150,
  defaultColor: 'rgba(175, 51, 242, 1)',
  defaultGradient:
    'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
}