import React, { useRef, useState, useEffect } from 'react'
import PickerContextWrapper from '../context.js'
import Picker from './Picker.js'
import { LocalesProps } from '../shared/types.js'
import { defaultLocales } from '../constants.js'
import { objectToString } from '../utils/utils.js'

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
}: ColorPickerProps) {
  const contRef = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState({})
  const safeValue = objectToString(value)

  useEffect(() => {
    if (contRef && contRef?.current) {
      setBounds(contRef?.current?.getBoundingClientRect())
    }

    document
      ?.getElementsByTagName('head')[0]
      ?.insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="https://gradient-package-demo.web.app/packagestyles.css" />'
      )
  }, [])

  return (
    <div ref={contRef} style={{ ...style, width: width }} className={className}>
      <PickerContextWrapper
        bounds={bounds}
        value={safeValue}
        onChange={onChange}
        squareSize={width}
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
