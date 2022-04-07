import React, { createContext, useContext, useState, useEffect } from 'react';
import { computePickerPosition, getGradientType, computeSquareXY, getDegrees, getNewHsl, getColors, getHandleValue } from './utils'
import { config } from './constants'
import { cloneDeep } from 'lodash';

var tinycolor = require("tinycolor2");
const { squareSize, crossSize } = config
const PickerContext = createContext();

export default function PickerContextWrapper({ children, bounds, value, onChange }) {
  const offsetLeft = bounds?.x
  const offsetTop = bounds?.y

  const isGradient = value?.includes('gradient')
  const gradientType = getGradientType(value)
  const degrees = getDegrees(value)
  const degreeStr = gradientType === 'linear-gradient' ? `${degrees}deg` : 'circle'
  const colors = getColors(value);

  const [selectedColor, setSelectedColor] = useState(0)
  const currentColor = colors[selectedColor]?.value;
  const [tinyColor, setTinyColor] = useState(tinycolor(currentColor));

  useEffect(() => {
    setTinyColor(tinycolor(currentColor))
  }, [currentColor])

  const { r, g, b, a: opacity } = tinyColor.toRgb();
  const { h, s, l } = tinyColor.toHsl();
  const hue = Math.round(h);
  const [x, y] = computeSquareXY([hue, s, l]);

  const handleGradient = (newColor, left = colors[selectedColor]?.left) => {
    let colorsCopy = colors
    colorsCopy[selectedColor] = {value: newColor, left: left}
    let deepCopy = cloneDeep(colors)
    let sorted = deepCopy.sort((a, b) => a.left - b.left)
    let colorString = sorted?.map((cc) => `${cc?.value} ${cc.left}%`)
    onChange(`${gradientType}(${degreeStr}, ${colorString.join(', ')})`)
  }

  const handleChange = (newColor) => {
    if (isGradient) {
      handleGradient(newColor)
    } else {
      onChange(newColor)
    }
  }

  const handleOpacity = (e) => {
    let newO = getHandleValue(e, offsetLeft) / 100;
    let newColor = `rgba(${r}, ${g}, ${b}, ${newO})`
    handleChange(newColor)
  }

  const handleHue = (e) => {
    let newHue = getHandleValue(e, offsetLeft) * 3.6;
    let newHsl = getNewHsl(newHue, s, l, opacity);
    handleChange(newHsl)
  }

  const handleColor = (e, ctx) => {
    const [x, y] = computePickerPosition(e, offsetLeft, offsetTop)
    const x1 = Math.min(x + crossSize / 2, squareSize - 1)
    const y1 = Math.min(y + crossSize / 2, squareSize - 1)
    const [r, g, b] = ctx.getImageData(x1, y1, 1, 1).data
    let newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`
    handleChange(newColor)
  }

  const addPoint = (e) => {
    let left = getHandleValue(e, offsetLeft)
    colors.push({value: colors[selectedColor]?.value, left: left })
    let deepCopy = cloneDeep(colors)
    let sorted = deepCopy.sort((a, b) => a.left - b.left)
    let colorString = sorted?.map((cc) => `${cc?.value} ${cc.left}%`)
    onChange(`${gradientType}(${degreeStr}, ${colorString.join(', ')})`)
    let newIndex = cloneDeep(sorted)?.map((s, i) => ({...s, i}))?.find((s) => s.left === left)
    setSelectedColor(newIndex?.i)
  }

  const deletePoint = () => {
    if (colors?.length > 2) {
      let remaining = colors?.filter((rc, i) => i !== selectedColor)
      let sorted = remaining.sort((a, b) => a.left - b.left)
      let colorString = sorted?.map((cc) => `${cc?.value} ${cc.left}%`)
      onChange(`${gradientType}(${degreeStr}, ${colorString.join(', ')})`)
      setSelectedColor(selectedColor === 0 ? 1 : selectedColor - 1)
    }
  }

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
    tinyColor,
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
    setSelectedColor,
  };

  return <PickerContext.Provider value={pickerState}>{children}</PickerContext.Provider>;
}

export function usePicker() {
  return useContext(PickerContext);
}
