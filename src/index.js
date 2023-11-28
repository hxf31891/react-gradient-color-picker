import React, { useRef, useState, useEffect } from 'react'
import PickerContextWrapper from './context'
import Picker from './components/Picker'
import { defaultLocales } from './constants'
import { objectToString } from './utils/utils'
export * from './hooks/useColorPicker'

function ColorPicker({
  value = 'rgba(175, 51, 242, 1)',
  onChange = () => {},
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

  useEffect(() => {
    setBounds(contRef?.current?.getBoundingClientRect())
  }, [])

  return (
    <div ref={contRef} style={{ ...style, width: width }} className={className}>
      <PickerContextWrapper
        bounds={bounds}
        value={safeValue}
        squareSize={width}
        onChange={onChange}
        squareHeight={height}
        hideOpacity={hideOpacity}
      >
        <Picker
          hideHue={hideHue}
          presets={presets}
          locales={locales}
          hideInputs={hideInputs}
          hidePresets={hidePresets}
          hideOpacity={hideOpacity}
          hideEyeDrop={hideEyeDrop}
          hideControls={hideControls}
          hideInputType={hideInputType}
          hideColorGuide={hideColorGuide}
          hideGradientType={hideGradientType}
          hideGradientStop={hideGradientStop}
          hideColorTypeBtns={hideColorTypeBtns}
          hideGradientAngle={hideGradientAngle}
          hideAdvancedSliders={hideAdvancedSliders}
          hideGradientControls={hideGradientControls}
        />
      </PickerContextWrapper>
    </div>
  )
}

export default ColorPicker
