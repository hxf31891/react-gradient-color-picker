import React, { useRef, useState, useEffect } from "react";
import PickerContextWrapper from './context';
import { useWindowSizes } from 'react-use-window-sizes';
import Picker from "./Picker";
import './styles.css';

function ColorPicker({
  value = 'rgba(175, 51, 242, 1)',
  onChange = () => {},
  hideControls,
  hideInputs,
  hidePresets,
  presets
}) {
  const contRef = useRef(null);
  const {
    width,
    height
  } = useWindowSizes();
  const [bounds, setBounds] = useState({});
  useEffect(() => {
    setBounds(contRef?.current?.getBoundingClientRect());
    setTimeout(() => setBounds(contRef?.current?.getBoundingClientRect()), 150);
  }, [width, height]);
  return /*#__PURE__*/React.createElement("div", {
    ref: contRef
  }, /*#__PURE__*/React.createElement(PickerContextWrapper, {
    bounds: bounds,
    value: value,
    onChange: onChange
  }, /*#__PURE__*/React.createElement(Picker, {
    hideControls: hideControls,
    hideInputs: hideInputs,
    hidePresets: hidePresets,
    presets: presets
  })));
}

export default ColorPicker;