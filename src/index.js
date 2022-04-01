import React, { useRef, useState, useEffect } from "react"
import { useScrollPosition } from 'react-use-scroll-position';
import { useWindowSizes } from 'react-use-window-sizes';
import PickerContextWrapper from './context';
import Picker from "./Picker";
import './styles.css';


function ColorPicker({ value = 'rgba(175, 51, 242, 1)', onChange = () => {}, hideControls, hideInputs, hidePresets, presets }) {
  const contRef = useRef(null);
  const { width, height } = useWindowSizes();
  const [bounds, setBounds] = useState({});
  const { x, y } = useScrollPosition();

  useEffect(() => {
    setBounds(contRef?.current?.getBoundingClientRect())
    setTimeout(() => setBounds(contRef?.current?.getBoundingClientRect()), 150)
  }, [width, height, x, y])

  return (
    <div ref={contRef}>
      <PickerContextWrapper bounds={bounds} value={value} onChange={onChange}>
        <Picker hideControls={hideControls} hideInputs={hideInputs} hidePresets={hidePresets} presets={presets} />
      </PickerContextWrapper>
    </div>
  )
}

export default ColorPicker
