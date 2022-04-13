import React from "react"
import Hue from "./Hue"
import Inputs from './Inputs'
import Square from "./Square"
import Opacity from './Opacity'
import Presets from './Presets'
import Controls from './Controls'
import GradientBar from './GradientBar'
import { usePicker } from './context'

const Picker = ({ hideControls, hideInputs, hidePresets, presets, hideEyeDrop, hideAdvancedSliders, hideColorGuide, hideInputType }) => {
  const { isGradient } = usePicker();

  return (
    <div style={{ userSelect: 'none' }}>
      <Square />
      {!hideControls && <Controls hideEyeDrop={hideEyeDrop} hideAdvancedSliders={hideAdvancedSliders} hideColorGuide={hideColorGuide} hideInputType={hideInputType} />}
      {isGradient && <GradientBar />}
      <Hue />
      <Opacity />
      {!hideInputs && <Inputs />}
      {!hidePresets && <Presets presets={presets} />}
    </div>
  )
}

export default Picker
