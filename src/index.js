import React, { useRef, useState, useEffect } from "react"
import PickerContextWrapper from './context'
import { useWindowWidth } from '~App/hooks'
import Picker from "./Picker"
import './styles.css'
import { convertRGBtoHSL } from './utils'
var gradient = require('gradient-parser');

function ColorPicker({  value, onChange }) {
  const contRef = useRef(null)
  const width = useWindowWidth()
  const [isGradient, setIsGradient] = useState(value?.includes('gradient'))
  const colors = getColors(value, isGradient)
  const [bounds, setBounds] = useState({})

  useEffect(() => {
    setBounds(contRef?.current?.getBoundingClientRect())
  }, [width])

  return (
    <div ref={contRef}>
      <PickerContextWrapper bounds={bounds} colors={colors} isGradient={isGradient} value={value} onChange={onChange}>
        <Picker bounds={bounds} />
      </PickerContextWrapper>
    </div>
  )
}

export default ColorPicker

const getColors = (value, isGradient) => {
  if (isGradient) {
    var obj = gradient.parse(value);
    return obj[0]?.colorStops?.map((c) => ({value: `rgba(${c.value[0]}, ${c.value[1]}, ${c.value[2]}, ${c.value[3]})`, left: parseInt(c.length?.value), hsl: convertRGBtoHSL([parseInt(c.value[0]), parseInt(c.value[1]), parseInt(c.value[2])]), opacity: parseInt(c.value[3]) * 100 }))
  } else {
    let arr = value.split('(')[1]?.slice(0,-1)?.split(',')
    return [{ value: value, hsl: convertRGBtoHSL([parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2])]), opacity: parseInt(arr[3]) * 100 }]
  }
}
