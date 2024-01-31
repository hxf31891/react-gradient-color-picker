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
