import React, { useRef, useState, useEffect } from "react"
import PickerContextWrapper from './context'
import PropTypes from 'prop-types'
import Picker from "./Picker";
import './styles.css';

export * from './useColorPicker'

function ColorPicker({ value = 'rgba(175, 51, 242, 1)', onChange = () => {}, hideControls = false, hideInputs = false, hidePresets = false, presets = [], hideEyeDrop = false, hideAdvancedSliders = false, hideColorGuide = false, hideInputType = false, width = 294 }) {
  const contRef = useRef(null);
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    setBounds(contRef?.current?.getBoundingClientRect());
  }, [])

  return (
    <div ref={contRef} style={{ width: width }}>
      <PickerContextWrapper bounds={bounds} value={value} onChange={onChange} squareSize={width}>
        <Picker hideControls={hideControls} hideInputs={hideInputs} hidePresets={hidePresets} presets={presets} hideEyeDrop={hideEyeDrop} hideAdvancedSliders={hideAdvancedSliders} hideColorGuide={hideColorGuide} hideInputType={hideInputType} />
      </PickerContextWrapper>
    </div>
  )
}

export default ColorPicker;

ColorPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  hideControls: PropTypes.bool,
  hideInputs: PropTypes.bool,
  hidePresets: PropTypes.bool,
  presets: PropTypes.array,
  hideEyeDrop: PropTypes.bool,
  hideAdvancedSliders: PropTypes.bool,
  hideColorGuide: PropTypes.bool,
  hideInputType: PropTypes.bool,
}
