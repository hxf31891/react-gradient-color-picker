'use client'
import React from 'react'
import PickerContextWrapper from '../context.js'
import Picker from './Picker.js'
import { ColorPickerProps } from '../shared/types.js'
import { defaultLocales } from '../constants.js'
import { objectToString } from '../utils/utils.js'
import { getStyles } from '../styles/styles.js'

export function ColorPicker({
  id,
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
  disableDarkMode = false,
  disableLightMode = false,
  hidePickerSquare = false,
}: ColorPickerProps) {
  const safeValue = objectToString(value)
    const isDarkMode =
      typeof window === 'undefined' || disableDarkMode
        ? false
        : window.matchMedia('(prefers-color-scheme: dark)').matches ||
            disableLightMode
          ? true
          : false
  // const contRef = useRef<HTMLDivElement>(null)
  const defaultStyles = getStyles(isDarkMode)
  const pickerId = id
    ? id
    : !disableDarkMode && !disableLightMode
      ? 'rbgcp-color-picker'
      : disableDarkMode
        ? 'rbgcp-color-picker-light'
        : 'rbgcp-color-picker-dark'

  return (
    <div
      // ref={contRef}
      className={className}
      style={{ ...defaultStyles.body, ...style, width: width }}
    >
      <PickerContextWrapper
        value={safeValue}
        onChange={onChange}
        squareWidth={width}
        squareHeight={height}
        isDarkMode={isDarkMode}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
      >
        <Picker
          pickerId={pickerId}
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
          hidePickerSquare={hidePickerSquare}
          locales={locales}
        />
      </PickerContextWrapper>
    </div>
  )
}
