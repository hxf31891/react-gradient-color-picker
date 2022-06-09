import React from "react";
import Hue from "./Hue";
import Inputs from './Inputs';
import Square from "./Square";
import Opacity from './Opacity';
import Presets from './Presets';
import Controls from './Controls';
import PropTypes from 'prop-types';
import GradientBar from './GradientBar';
import { usePicker } from './context';

const Picker = ({
  hideControls,
  hideInputs,
  hidePresets,
  presets,
  hideEyeDrop,
  hideAdvancedSliders,
  hideColorGuide,
  hideInputType
}) => {
  const {
    isGradient
  } = usePicker();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement(Square, null), !hideControls && /*#__PURE__*/React.createElement(Controls, {
    hideEyeDrop: hideEyeDrop,
    hideAdvancedSliders: hideAdvancedSliders,
    hideColorGuide: hideColorGuide,
    hideInputType: hideInputType
  }), isGradient && /*#__PURE__*/React.createElement(GradientBar, null), /*#__PURE__*/React.createElement(Hue, null), /*#__PURE__*/React.createElement(Opacity, null), !hideInputs && /*#__PURE__*/React.createElement(Inputs, null), !hidePresets && /*#__PURE__*/React.createElement(Presets, {
    presets: presets
  }));
};

export default Picker;
Picker.propTypes = {
  hideControls: PropTypes.bool,
  hideInputs: PropTypes.bool,
  hidePresets: PropTypes.bool,
  presets: PropTypes.array,
  hideEyeDrop: PropTypes.bool,
  hideAdvancedSliders: PropTypes.bool,
  hideColorGuide: PropTypes.bool,
  hideInputType: PropTypes.bool
};