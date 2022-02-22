import React, { useRef, useState, useEffect } from "react"
import PickerContextWrapper from './context'
import { useWindowSizes } from 'react-use-window-sizes'
import Picker from "./Picker"
import './styles.css'


function ColorPicker({ value = 'rgba(175, 51, 242, 1)', onChange = () => {}, hideControls, hideInputs, hidePresets }) {
  const contRef = useRef(null)
  const { width } = useWindowSizes()
  const [bounds, setBounds] = useState({})

  useEffect(() => {
    setBounds(contRef?.current?.getBoundingClientRect())
    setTimeout(() => setBounds(contRef?.current?.getBoundingClientRect()), 150)
  }, [width])

  return (
    <div ref={contRef}>
      <PickerContextWrapper bounds={bounds} value={value} onChange={onChange}>
        <Picker hideControls={hideControls} hideInputs={hideInputs} hidePresets={hidePresets} />
      </PickerContextWrapper>
    </div>
  )
}

export default ColorPicker
