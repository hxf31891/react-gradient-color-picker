export type ColorPickerProps = {
  id?: string
  value?: string
  onChange: (value: string) => void
  hideControls?: boolean
  hideInputs?: boolean
  hideOpacity?: boolean
  hidePresets?: boolean
  hideHue?: boolean
  presets?: string[]
  hideEyeDrop?: boolean
  hideAdvancedSliders?: boolean
  hideColorGuide?: boolean
  hideInputType?: boolean
  hideColorTypeBtns?: boolean
  hideGradientType?: boolean
  hideGradientAngle?: boolean
  hideGradientStop?: boolean
  hideGradientControls?: boolean
  width?: number
  height?: number
  style?: Styles
  className?: any
  locales?: LocalesProps
  disableDarkMode?: boolean
  disableLightMode?: boolean
  hidePickerSquare?: boolean
}

export type ColorsProps = {
  value: string
  index?: number
  left?: number
}

export type GradientProps = {
  value: string
  index: number
  left: number
}

export type LocalesProps = {
  CONTROLS: controlsProps
}

type controlsProps = {
  SOLID: string
  GRADIENT: string
}

export type ThemeProps = {
  light: ThemeMode
  dark: ThemeMode
}

export type ThemeMode = {
  color?: string
  background?: string
  highlights?: string
  accent?: string
}

export type Styles = Record<string, Record<string, string | number>>
