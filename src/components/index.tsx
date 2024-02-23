import React, { useRef } from 'react'
import PickerContextWrapper from '../context.js'
import Picker from './Picker.js'
import { Config, LocalesProps } from '../shared/types.js'
import { config, defaultLocales } from '../constants.js'
import { objectToString } from '../utils/utils.js'
import coreCss from '../core.module.css'

const defaultConfig = config;

type ColorPickerProps = {
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
  style?: {}
  className?: any
  locales?: LocalesProps
  disableDarkMode?: boolean
  config?: Config
}

export function ColorPicker({
  value = 'rgba(175, 51, 242, 1)',
  onChange,
  hideControls = false,
  hideInputs = false,
  hideOpacity = false,
  hidePresets = false,
  hideHue = false,
  presets = [],
  hideEyeDrop = false,
  hideAdvancedSliders = false,
  hideColorGuide = false,
  hideInputType = false,
  hideColorTypeBtns = false,
  hideGradientType = false,
  hideGradientAngle = false,
  hideGradientStop = false,
  hideGradientControls = false,
  locales = defaultLocales,
  width = 294,
  height = 294,
  style = {},
  className,
  config = defaultConfig,
}: ColorPickerProps) {
  const safeValue = objectToString(value)
  const contRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={contRef} className={className} style={{ ...style, width: width }}>
      <PickerContextWrapper
        config={config}
        value={safeValue}
        classes={coreCss}
        onChange={onChange}
        squareWidth={width}
        squareHeight={height}
        hideOpacity={hideOpacity}
      >
        <Picker
          hideControls={hideControls}
          hideInputs={hideInputs}
          hidePresets={hidePresets}
          hideOpacity={hideOpacity}
          hideHue={hideHue}
          presets={presets}
          hideEyeDrop={hideEyeDrop}
          hideAdvancedSliders={hideAdvancedSliders}
          hideColorGuide={hideColorGuide}
          hideInputType={hideInputType}
          hideColorTypeBtns={hideColorTypeBtns}
          hideGradientType={hideGradientType}
          hideGradientAngle={hideGradientAngle}
          hideGradientStop={hideGradientStop}
          hideGradientControls={hideGradientControls}
          locales={locales}
        />
      </PickerContextWrapper>
    </div>
  )
}
