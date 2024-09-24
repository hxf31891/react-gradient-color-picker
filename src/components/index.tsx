'use client'
import React, { useRef } from 'react'
import PickerContextWrapper from '../context.js'
import Picker from './Picker.js'
import type { ColorPickerProps, Styles } from '../shared/types.js'
import { defaultLocales } from '../constants.js'
import { objectToString } from '../utils/utils.js'
import { getStyles } from '../styles/styles.js'

// function to merge default styles with user styles
function mergeStyles(componentStyles: Styles, styles: Styles) {
  const mergedStyles = { ...componentStyles }
  for (const key in styles) {
    if (Object.prototype.hasOwnProperty.call(styles, key)) {
      mergedStyles[key as keyof Styles] = {
        ...(Object.prototype.hasOwnProperty.call(mergedStyles, key)
          ? mergedStyles[key as keyof Styles]
          : {}),
        ...styles[key as keyof Styles],
      }
    }
  }
  return mergedStyles
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
  disableDarkMode = false,
}: ColorPickerProps) {
  const safeValue = objectToString(value)
  const contRef = useRef<HTMLDivElement>(null)
  const defaultComponentStyles = getStyles(disableDarkMode)
  const mergedComponentStyles = mergeStyles(defaultComponentStyles, style)

  return (
    <div
      ref={contRef}
      className={className}
      style={{ ...mergedComponentStyles.Container, width: width }}
    >
      <PickerContextWrapper
        value={safeValue}
        onChange={onChange}
        squareWidth={width}
        squareHeight={height}
        hideOpacity={hideOpacity}
        componentStyles={mergedComponentStyles}
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
