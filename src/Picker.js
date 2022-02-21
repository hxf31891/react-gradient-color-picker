import React from "react"
import Hue from "./Hue"
import Square from "./Square"
import Opacity from './Opacity'
import GradientBar from './GradientBar'

const Picker = () => {
  return (
    <div style={{ userSelect: 'none' }}>
      <Square />
      <GradientBar />
      <Hue />
      <Opacity />
    </div>
  )
}

export default Picker
