import React from "react";
import Hue from "./Hue";
import Inputs from './Inputs';
import Square from "./Square";
import Opacity from './Opacity';
import Presets from './Presets';
import Controls from './Controls';
import GradientBar from './GradientBar';
import { usePicker } from './context';

const Picker = ({
  hideControls,
  hideInputs,
  hidePresets
}) => {
  const {
    isGradient
  } = usePicker();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement(Square, null), !hideControls && /*#__PURE__*/React.createElement(Controls, null), isGradient && /*#__PURE__*/React.createElement(GradientBar, null), /*#__PURE__*/React.createElement(Hue, null), /*#__PURE__*/React.createElement(Opacity, null), !hideInputs && /*#__PURE__*/React.createElement(Inputs, null), !hidePresets && /*#__PURE__*/React.createElement(Presets, null));
};

export default Picker;