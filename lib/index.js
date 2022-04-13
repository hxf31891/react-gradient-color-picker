import React, { useRef, useState, useEffect } from "react";
import PickerContextWrapper from './context';
import Picker from "./Picker";
import './styles.css';
export * from './useColorPicker';

function ColorPicker({
  value = 'rgba(175, 51, 242, 1)',
  onChange = () => {},
  hideControls = false,
  hideInputs = false,
  hidePresets = false,
  presets = [],
  hideEyeDrop = false,
  hideAdvancedSliders = false,
  hideColorGuide = false,
  hideInputType = false
}) {
  const contRef = useRef(null);
  const [bounds, setBounds] = useState({});
  useEffect(() => {
    setBounds(contRef?.current?.getBoundingClientRect());
  }, []);
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
    presets: presets,
    hideEyeDrop: hideEyeDrop,
    hideAdvancedSliders: hideAdvancedSliders,
    hideColorGuide: hideColorGuide,
    hideInputType: hideInputType
  })));
}

export default ColorPicker;