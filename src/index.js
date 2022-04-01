import React, { useRef, useState, useEffect } from "react"
import PickerContextWrapper from './context'
import { useWindowSizes } from 'react-use-window-sizes'
import Picker from "./Picker"
import './styles.css'


function ColorPicker({ value = 'rgba(175, 51, 242, 1)', onChange = () => {}, hideControls, hideInputs, hidePresets, presets }) {
  const contRef = useRef(null)
  const { width, height } = useWindowSizes()
  const [bounds, setBounds] = useState({})
  const onScroll = () => {
    return setBounds(contRef?.current?.getBoundingClientRect())
  }

  let a = contRef?.current
  let els = []
  while (a) {
    a.addEventListener('scroll', onScroll, {once: true});
    els.unshift(a);
    a = a.parentNode;
  }

  setTimeout(() => setBounds(contRef?.current?.getBoundingClientRect()), 150)
  useEffect(() => {
    setBounds(contRef?.current?.getBoundingClientRect())
  }, [width, height])

  return (
    <div ref={contRef}>
      <PickerContextWrapper bounds={bounds} value={value} onChange={onChange}>
        <Picker hideControls={hideControls} hideInputs={hideInputs} hidePresets={hidePresets} presets={presets} />
      </PickerContextWrapper>
    </div>
  )
}

export default ColorPicker
