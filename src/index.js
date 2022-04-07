import React, { useRef, useState, useEffect } from "react"
import PickerContextWrapper from './context';
import Picker from "./Picker";
import './styles.css';

function ColorPicker({ value = 'rgba(175, 51, 242, 1)', onChange = () => {}, hideControls = false, hideInputs = false, hidePresets = false, presets = [] }) {
  const contRef = useRef(null);
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    setBounds(contRef?.current?.getBoundingClientRect())
  }, [])

  return (
    <div ref={contRef}>
      <PickerContextWrapper bounds={bounds} value={value} onChange={onChange}>
        <Picker hideControls={hideControls} hideInputs={hideInputs} hidePresets={hidePresets} presets={presets} />
      </PickerContextWrapper>
    </div>
  )
}

export default ColorPicker
