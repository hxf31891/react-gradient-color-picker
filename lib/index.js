import React, { useRef, useState, useEffect } from "react";
import PickerContextWrapper from './context';
import { useWindowSizes } from 'react-use-window-sizes';
import Picker from "./Picker";
import './styles.css';
import { convertRGBtoHSL } from './utils';

var gradient = require('gradient-parser');

function ColorPicker({
  value,
  onChange
}) {
  const contRef = useRef(null);
  const width = useWindowSizes();
  const [isGradient, setIsGradient] = useState(value?.includes('gradient'));
  const colors = getColors(value, isGradient);
  const [bounds, setBounds] = useState({});
  useEffect(() => {
    setBounds(contRef?.current?.getBoundingClientRect());
  }, [width]);
  return /*#__PURE__*/React.createElement("div", {
    ref: contRef
  }, /*#__PURE__*/React.createElement(PickerContextWrapper, {
    bounds: bounds,
    colors: colors,
    isGradient: isGradient,
    value: value,
    onChange: onChange
  }, /*#__PURE__*/React.createElement(Picker, {
    bounds: bounds
  })));
}

export default ColorPicker;

const getColors = (value, isGradient) => {
  if (isGradient) {
    var obj = gradient.parse(value);
    return obj[0]?.colorStops?.map(c => ({
      value: `rgba(${c.value[0]}, ${c.value[1]}, ${c.value[2]}, ${c.value[3]})`,
      left: parseInt(c.length?.value),
      hsl: convertRGBtoHSL([parseInt(c.value[0]), parseInt(c.value[1]), parseInt(c.value[2])]),
      opacity: parseInt(c.value[3]) * 100
    }));
  }
};