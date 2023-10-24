import React from 'react'
import Hue from './Hue'
import Inputs from './Inputs'
import Square from './Square'
import Opacity from './Opacity'
import Presets from './Presets'
import Controls from './Controls'
import GradientBar from './GradientBar'
import { usePicker } from '../context'

const Picker = ({
  hideControls,
  hideInputs,
  hidePresets,
  hideOpacity,
  hideHue,
  presets,
  hideEyeDrop,
  hideAdvancedSliders,
  hideColorGuide,
  hideInputType,
  hideColorTypeBtns,
  hideGradientType,
  hideGradientAngle,
  hideGradientStop,
  hideGradientControls,
  locales,
}) => {
  const { isGradient } = usePicker()

  return (
    <div style={{ userSelect: 'none' }} id="rbgcp-wrapper">
      <Square />
      {!hideControls && (
        <Controls
          hideEyeDrop={hideEyeDrop}
          hideAdvancedSliders={hideAdvancedSliders}
          hideColorGuide={hideColorGuide}
          hideInputType={hideInputType}
          hideColorTypeBtns={hideColorTypeBtns}
          hideGradientControls={hideGradientControls}
          hideGradientType={hideGradientType}
          hideGradientAngle={hideGradientAngle}
          hideGradientStop={hideGradientStop}
          locales={locales}
        />
      )}
      {isGradient && <GradientBar />}
      {!hideHue && <Hue />}
      {!hideOpacity && <Opacity />}
      {!hideInputs && <Inputs />}
      {!hidePresets && <Presets presets={presets} />}
    </div>
  )
}

export default Picker
