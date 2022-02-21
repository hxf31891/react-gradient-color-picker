import React from "react";
import Hue from "./Hue";
import Square from "./Square";
import Opacity from './Opacity';
import GradientBar from './GradientBar';
import { usePicker } from './context';

const Picker = () => {
  const {
    isGradient
  } = usePicker();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement(Square, null), isGradient && /*#__PURE__*/React.createElement(GradientBar, null), /*#__PURE__*/React.createElement(Hue, null), /*#__PURE__*/React.createElement(Opacity, null));
};

export default Picker;