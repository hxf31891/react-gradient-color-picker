import React, { useRef, useState, useEffect } from "react";
import PickerContextWrapper from './context';
import { useWindowSizes } from 'react-use-window-sizes';
import Picker from "./Picker";
import './styles.css';

function ColorPicker({
  value,
  onChange
}) {
  const contRef = useRef(null);
  const {
    width
  } = useWindowSizes();
  const [bounds, setBounds] = useState({});
  useEffect(() => {
    setBounds(contRef?.current?.getBoundingClientRect());
  }, [width]);
  return /*#__PURE__*/React.createElement("div", {
    ref: contRef
  }, /*#__PURE__*/React.createElement(PickerContextWrapper, {
    bounds: bounds,
    value: value,
    onChange: onChange
  }, /*#__PURE__*/React.createElement(Picker, null)));
}

export default ColorPicker;