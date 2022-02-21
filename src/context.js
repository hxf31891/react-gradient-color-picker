import React, { createContext, useContext, useState } from 'react';
import { computeBarPosition, computeHue, computeOpacity, computePickerPosition, getGradientType, computeSquareXY } from './utils'
import { getHue, getHsl, getNewHsl, getRGBValues, getOpacity, getColors } from './utils'
import { config } from './constants'
import { cloneDeep } from 'lodash';

const { squareSize, barSize, crossSize } = config

const PickerContext = createContext();

export default function PickerContextWrapper({ children, bounds, value, onChange }) {
  const offsetLeft = bounds?.x
  const offsetTop = bounds?.y

  const [isGradient, setIsGradient] = useState(value?.includes('gradient'))
  const colors = getColors(value, isGradient)
  const [selectedColor, setSelectedColor] = useState(0)

  const currentColor = colors[selectedColor]?.value

  const hue = getHue(currentColor)
  const opacity = getOpacity(currentColor)
  const [x, y] = computeSquareXY(currentColor)

  const handleGradient = (newColor, left = colors[selectedColor]?.left) => {
    let colorsCopy = colors
    colorsCopy[selectedColor] = {value: newColor, left: left}
    let deepCopy = cloneDeep(colors)
    let sorted = deepCopy.sort((a, b) => a.left - b.left)
    let colorString = sorted?.map((cc) => `${cc?.value} ${cc.left}%`)
    onChange(`${getGradientType(value)}, ${colorString.join(', ')})`)
  }

  const handleOpacity = (e) => {
    const x = computeBarPosition(e, offsetLeft)
    const o = computeOpacity(x)
    const oldValue = getRGBValues(currentColor)
    let newColor = `rgba(${oldValue[0]}, ${oldValue[1]}, ${oldValue[2]}, ${o / 100})`
    if (isGradient) {
      handleGradient(newColor)
    } else {
      onChange(newColor)
    }
  }

  const handleHue = (e) => {
    const x = computeBarPosition(e, offsetLeft)
    let newHue = computeHue(x)
    let oldHsl = getHsl(currentColor)
    let newHsl = getNewHsl(newHue, oldHsl[1], oldHsl[2], opacity)
    if (isGradient) {
      handleGradient(newHsl)
    } else {
      onChange(newHsl)
    }
  }

  const handleColor = (e, ctx) => {
    const [x, y] = computePickerPosition(e, offsetLeft, offsetTop)
    const x1 = Math.min(x + crossSize / 2, squareSize - 1)
    const y1 = Math.min(y + crossSize / 2, squareSize - 1)
    const [r, g, b] = ctx.getImageData(x1, y1, 1, 1).data
    let newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`
    if (isGradient) {
      handleGradient(newColor)
    } else {
      onChange(newColor)
    }
  }

  const handleGradientLeft = (newLeft) => {
    handleGradient(currentColor, newLeft)
  }

  const handleSelectedColor = (e, index) => {
    e.stopPropagation()
    setSelectedColor(index);
  }

  const addPoint = (e) => {
    e.stopPropagation()
    let newIndex = colors.length
    let left = computeBarPosition(e, offsetLeft)
    colors.push({value: currentColor, left: left / 2.8 })
    let deepCopy = cloneDeep(colors)
    let sorted = deepCopy.sort((a, b) => a.left - b.left)
    let colorString = sorted?.map((cc) => `${cc?.value} ${cc.left}%`)
    onChange(`${getGradientType(value)}, ${colorString.join(', ')})`)
    handleSelectedColor(e, newIndex)
  }

  const deletePoint = (index) => {
    if (colors?.length > 1) {
      let remaining = colors?.filter((rc, i) => i !== index)
      colors = remaining
    }
  }

  const pickerState = {
    x,
    y,
    hue,
    value,
    colors,
    opacity,
    addPoint,
    handleHue,
    isGradient,
    offsetLeft,
    handleColor,
    deletePoint,
    currentColor,
    handleOpacity,
    handleGradientLeft,
    handleSelectedColor
  };

  return <PickerContext.Provider value={pickerState}>{children}</PickerContext.Provider>;
}

export function usePicker() {
  return useContext(PickerContext);
}
