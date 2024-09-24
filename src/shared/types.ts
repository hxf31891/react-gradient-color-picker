export type ColorPickerProps = {
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
  Container: React.CSSProperties
  ControlBtn: React.CSSProperties
  ControlIcon: React.CSSProperties
  ControlIconBtn: React.CSSProperties
  ControlBtnWrapper: React.CSSProperties
  ColorModelDropdown: React.CSSProperties
  EyedropperCover: React.CSSProperties
  EyedropperBtn: React.CSSProperties
  ControlInput: React.CSSProperties
  InputLabel: React.CSSProperties
  Input: React.CSSProperties
  InputsWrap: React.CSSProperties
  HexInput: React.CSSProperties
  Handle: React.CSSProperties
  CanvasWrapper: React.CSSProperties
  Checkered: React.CSSProperties
  OpacityOverlay: React.CSSProperties
  GradientHandleWrap: React.CSSProperties
  GradientHandle: React.CSSProperties
  ControlIcon2: React.CSSProperties
  ControlBtnSelected: React.CSSProperties
  ComparibleLabel: React.CSSProperties
  ColorModelDropdownBtn: React.CSSProperties
  ControlInputWrap: React.CSSProperties
  StopInputWrap: React.CSSProperties
  StopInput: React.CSSProperties
  DegreeInputWrap: React.CSSProperties
  DegreeInput: React.CSSProperties
  DegreeIcon: React.CSSProperties
}>
