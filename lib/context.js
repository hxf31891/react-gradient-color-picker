import React, { createContext, useContext, useState } from 'react';
import { computeBarPosition, computeHue, computeOpacity, computePickerPosition, getGradientType, computeSquareXY, getDegrees } from './utils';
import { getHue, getHsl, getNewHsl, getRGBValues, getOpacity, getColors } from './utils';
import { config } from './constants';
import { cloneDeep } from 'lodash';
const {
  squareSize,
  barSize,
  crossSize
} = config;
const PickerContext = /*#__PURE__*/createContext();
export default function PickerContextWrapper({
  children,
  bounds,
  value,
  onChange
}) {
  const offsetLeft = bounds?.x;
  const offsetTop = bounds?.y;
  const isGradient = value?.includes('gradient');
  const gradientType = getGradientType(value);
  const degrees = getDegrees(value);
  const degreeStr = gradientType === 'linear-gradient' ? `${degrees}deg` : 'circle';
  const colors = getColors(value);
  const [selectedColor, setSelectedColor] = useState(0);
  const currentColor = colors[selectedColor]?.value;
  const hue = getHue(currentColor);
  const opacity = getOpacity(currentColor);
  const [x, y] = computeSquareXY(currentColor);

  const handleGradient = (newColor, left = colors[selectedColor]?.left) => {
    let colorsCopy = colors;
    colorsCopy[selectedColor] = {
      value: newColor,
      left: left
    };
    let deepCopy = cloneDeep(colors);
    let sorted = deepCopy.sort((a, b) => a.left - b.left);
    let colorString = sorted?.map(cc => `${cc?.value} ${cc.left}%`);
    onChange(`${gradientType}(${degreeStr}, ${colorString.join(', ')})`);
  };

  const handleChange = newColor => {
    if (isGradient) {
      handleGradient(newColor);
    } else {
      onChange(newColor);
    }
  };

  const handleOpacity = e => {
    const x = computeBarPosition(e, offsetLeft);
    const o = computeOpacity(x);
    const oldValue = getRGBValues(currentColor);
    let newColor = `rgba(${oldValue[0]}, ${oldValue[1]}, ${oldValue[2]}, ${o / 100})`;
    handleChange(newColor);
  };

  const handleHue = e => {
    const x = computeBarPosition(e, offsetLeft);
    let newHue = computeHue(x);
    let oldHsl = getHsl(currentColor);
    let newHsl = getNewHsl(newHue, oldHsl[1], oldHsl[2], opacity);
    handleChange(newHsl);
  };

  const handleColor = (e, ctx) => {
    const [x, y] = computePickerPosition(e, offsetLeft, offsetTop);
    const x1 = Math.min(x + crossSize / 2, squareSize - 1);
    const y1 = Math.min(y + crossSize / 2, squareSize - 1);
    const [r, g, b] = ctx.getImageData(x1, y1, 1, 1).data;
    let newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    handleChange(newColor);
  };

  const handleGradientLeft = newLeft => {
    if (newLeft < 100) {
      handleGradient(currentColor, newLeft);
    }
  };

  const handleSelectedColor = (e, newI) => {
    e.stopPropagation();
    setSelectedColor(newI);
  };

  const addPoint = e => {
    e.stopPropagation();
    let newIndex = colors.length;
    let left = computeBarPosition(e, offsetLeft);
    colors.push({
      value: colors[selectedColor]?.value,
      left: left / 2.8
    });
    let deepCopy = cloneDeep(colors);
    let sorted = deepCopy.sort((a, b) => a.left - b.left);
    let colorString = sorted?.map(cc => `${cc?.value} ${cc.left}%`);
    onChange(`${gradientType}(${degreeStr}, ${colorString.join(', ')})`);
    handleSelectedColor(e, newIndex);
  };

  const deletePoint = e => {
    if (colors?.length > 2) {
      let remaining = colors?.filter((rc, i) => i !== selectedColor);
      let sorted = remaining.sort((a, b) => a.left - b.left);
      let colorString = sorted?.map(cc => `${cc?.value} ${cc.left}%`);
      onChange(`${gradientType}(${degreeStr}, ${colorString.join(', ')})`);
      setSelectedColor(selectedColor - 1);
    }
  };

  const pickerState = {
    x,
    y,
    hue,
    value,
    colors,
    degrees,
    opacity,
    onChange,
    addPoint,
    handleHue,
    isGradient,
    offsetLeft,
    handleColor,
    deletePoint,
    gradientType,
    handleChange,
    currentColor,
    selectedColor,
    handleOpacity,
    handleGradient,
    setSelectedColor,
    handleGradientLeft,
    handleSelectedColor
  };
  return /*#__PURE__*/React.createElement(PickerContext.Provider, {
    value: pickerState
  }, children);
}
export function usePicker() {
  return useContext(PickerContext);
}