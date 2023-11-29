import React, { useRef, useState, useEffect } from 'react'
import PickerContextWrapper from '../context'
import Picker from './Picker'
import { defaultLocales } from '../constants'
import { objectToString } from '../utils/utils'

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
}) {
  const contRef = useRef(null)
  const [bounds, setBounds] = useState({});
  const safeValue = objectToString(value);

  document
  .getElementsByTagName("head")[0]
  .insertAdjacentHTML(
    "beforeend",
    '<link rel="stylesheet" href="https://prod-api.outsyde.app/packagestyles.css" />'
  );

  useEffect(() => {
    setBounds(contRef?.current?.getBoundingClientRect())
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
