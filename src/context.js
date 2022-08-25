import React, { createContext, useContext, useState, useEffect } from 'react';
import { computePickerPosition, getGradientType, computeSquareXY, getDegrees, getNewHsl, getHandleValue, isUpperCase } from './utils'
import { low, high, getColors } from './formatters'
import { config } from './constants'
import PropTypes from 'prop-types'

var tinycolor = require("tinycolor2");
const { crossSize } = config
const PickerContext = createContext();

export default function PickerContextWrapper({ children, bounds, value, onChange, squareSize }) {
  const offsetLeft = bounds?.x

  const isGradient = value?.includes('gradient')
  const gradientType = getGradientType(value)
  const degrees = getDegrees(value)
  const degreeStr = gradientType === 'linear-gradient' ? `${degrees}deg` : 'circle'
  const colors = getColors(value);
  const indexedColors = colors?.map((c, i) => ({...c, index: i}))
  const currentColorObj = indexedColors?.filter(c => isUpperCase(c.value))[0] || indexedColors[0]
  const currentColor = currentColorObj?.value;
  const selectedColor = currentColorObj?.index;
  const currentLeft = currentColorObj?.left
  const [tinyColor, setTinyColor] = useState(tinycolor(currentColor));
  const [inputType, setInputType] = useState('rgb');

  const { r, g, b, a: opacity } = tinyColor.toRgb();
  const { h, s, l } = tinyColor.toHsl();
  const { s: hsvS, v: hsvV } = tinyColor.toHsv();
  const [internalHue, setInternalHue] = useState(Math.round(h))
  const hue = Math.round(h);
  const [x, y] = computeSquareXY([hue, s, l], squareSize);
  const [previousColors, setPreviousColors] = useState([]);
  const [previousGraidents, setPreviousGradients] = useState([]);

  useEffect(() => {
    setTinyColor(tinycolor(currentColor))
    setInternalHue(hue)
  }, [currentColor, hue])

  useEffect(() => {
    if (isGradient) {
      setPreviousGradients([value, ...previousGraidents?.slice(0, 4) ]);
    } else {
      if (tinycolor(value).isValid()) {
        setPreviousColors([value, ...previousColors?.slice(0, 4) ])
      }
    }
  //eslint-disable-next-line
  }, [value])

  const createGradientStr = (newColors) => {
    let sorted = newColors.sort((a, b) => a.left - b.left)
    let colorString = sorted?.map((cc) => `${cc?.value} ${cc.left}%`)
    onChange(`${gradientType}(${degreeStr}, ${colorString.join(', ')})`)
  }

  const handleGradient = (newColor, left = currentLeft) => {
    let remaining = colors?.filter(c => !isUpperCase(c.value));
    let newColors = [{value: newColor.toUpperCase(), left: left}, ...remaining]
    createGradientStr(newColors)
  }

  const handleChange = (newColor) => {
    if (isGradient) {
      handleGradient(newColor)
    } else {
      onChange(newColor)
    }
  }

  const handleOpacity = (e) => {
    let newO = getHandleValue(e) / 100;
    let newColor = `rgba(${r}, ${g}, ${b}, ${newO})`
    handleChange(newColor)
  }

  const handleHue = (e) => {
    let newHue = getHandleValue(e) * 3.6;
    console.log(newHue);
    let newHsl = getNewHsl(newHue, s, l, opacity, setInternalHue);
    handleChange(newHsl)
  }

  const handleColor = (e, ctx) => {
    const [x, y] = computePickerPosition(e);
    const x1 = Math.min(x + crossSize / 2, squareSize - 1)
    const y1 = Math.min(y + crossSize / 2, squareSize - 1)
    const [r, g, b] = ctx.getImageData(x1, y1, 1, 1).data
    let newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`
    handleChange(newColor)
  }

  const setSelectedColor = (index) => {
    let newGradStr = colors?.map((cc, i) => ({...cc, value: i === index ? high(cc) : low(cc)}))
    createGradientStr(newGradStr)
  }

  const addPoint = (e) => {
    let left = getHandleValue(e, offsetLeft)
    let newColors = [...colors.map(c => ({...c, value: low(c)})), { value: currentColor, left: left }]
    createGradientStr(newColors)
  }

  const deletePoint = () => {
    if (colors?.length > 2) {
      let remaining = colors?.filter((rc, i) => i !== selectedColor)
      createGradientStr(remaining)
    }
  }

  const pickerState = {
    x,
    y,
    s,
    l,
    r,
    g,
    b,
    hue,
    hsvS,
    hsvV,
    value,
    colors,
    degrees,
    opacity,
    onChange,
    addPoint,
    inputType,
    tinyColor,
    handleHue,
    isGradient,
    offsetLeft,
    squareSize,
    handleColor,
    currentLeft,
    deletePoint,
    internalHue,
    setInputType,
    gradientType,
    handleChange,
    currentColor,
    selectedColor,
    handleOpacity,
    setInternalHue,
    previousColors,
    handleGradient,
    setSelectedColor,
    previousGraidents,
  };

  return <PickerContext.Provider value={pickerState}>{children}</PickerContext.Provider>;
}

export function usePicker() {
  return useContext(PickerContext);
}

PickerContextWrapper.propTypes = {
  children: PropTypes.node,
  bounds: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
}
