import React from "react"
import Hue from "./Hue"
import Inputs from './Inputs'
import Square from "./Square"
import Opacity from './Opacity'
import Presets from './Presets'
import Controls from './Controls'
import GradientBar from './GradientBar'
import { usePicker } from './context'

const Picker = () => {
  const { isGradient } = usePicker();

  return (
    <div style={{ userSelect: 'none' }}>
      <Square />
      <Controls />
      {isGradient && <GradientBar />}
      <Hue />
      <Opacity />
      <Inputs />
      <Presets />
    </div>
  )
}

export default Picker
