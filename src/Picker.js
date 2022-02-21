import React from "react"
import Hue from "./Hue"
import Square from "./Square"
import Opacity from './Opacity'
import GradientBar from './GradientBar'
import { usePicker } from './context'

const Picker = () => {
  const { isGradient } = usePicker();

  return (
    <div style={{ userSelect: 'none' }}>
      <Square />
      {isGradient && <GradientBar />}
      <Hue />
      <Opacity />
    </div>
  )
}

export default Picker
