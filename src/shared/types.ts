export type ColorPickerProps = {
  idSuffix?: string
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
  showHexAlpha?: boolean
  config?: PassedConfig
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

export type Styles = Partial<{
  body: React.CSSProperties
  rbgcpControlBtn: React.CSSProperties
  rbgcpControlIcon: React.CSSProperties
  rbgcpControlIconBtn: React.CSSProperties
  rbgcpControlBtnWrapper: React.CSSProperties
  rbgcpColorModelDropdown: React.CSSProperties
  rbgcpEyedropperCover: React.CSSProperties
  rbgcpControlInput: React.CSSProperties
  rbgcpInputLabel: React.CSSProperties
  rbgcpInput: React.CSSProperties
  rbgcpHandle: React.CSSProperties
  rbgcpCanvasWrapper: React.CSSProperties
  rbgcpCheckered: React.CSSProperties
  rbgcpOpacityOverlay: React.CSSProperties
  rbgcpGradientHandleWrap: React.CSSProperties
  rbgcpGradientHandle: React.CSSProperties
  rbgcpControlIcon2: React.CSSProperties
  rbgcpControlBtnSelected: React.CSSProperties
  rbgcpComparibleLabel: React.CSSProperties
  rbgcpColorModelDropdownBtn: React.CSSProperties
  rbgcpControlInputWrap: React.CSSProperties
  rbgcpStopInputWrap: React.CSSProperties
  rbgcpStopInput: React.CSSProperties
  rbgcpDegreeInputWrap: React.CSSProperties
  rbgcpDegreeInput: React.CSSProperties
  rbgcpDegreeIcon: React.CSSProperties
  rbgcpEyedropperBtn: React.CSSProperties
  rbgcpHexInput: React.CSSProperties
  rbgcpInputsWrap: React.CSSProperties
}>

export type PassedConfig = {
  barSize?: number
  crossSize?: number
  defaultColor?: string
  defaultGradient?: string
}

export type Config = {
  barSize: number
  crossSize: number
  defaultColor: string
  defaultGradient: string
}
