import React, { createContext, useContext, useState, useEffect } from 'react';
import { hsl2rgb } from './utils'
import { convertRGBtoHSL } from "./utils"
import { computeBarPosition, computeHue, computeOpacity, computePickerPosition, getInitialValues, getGradientType, computeHueX, computeSquareXY } from './utils'
import { config } from './constants'
import { cloneDeep } from 'lodash';

const { squareSize, barSize, crossSize } = config

const PickerContext = createContext();

export default function PickerContextWrapper({ children, bounds, colors, isGradient, value, onChange }) {
  const offsetLeft = bounds?.x
  const offsetTop = bounds?.y
  const [selectedColor, setSelectedColor] = useState(0)

  const initials = getInitialValues(colors, selectedColor)
  const [color, setColor] = useState(initials?.c)
  const [hue, setHue] = useState(initials?.h)
  const [hueX, setHueX] = useState(initials?.hx)
  const [opacity, setOpacity] = useState(initials?.o)
  const [opacityX, setOpacityX] = useState(initials?.ox)
  const [square, setSquare] = useState(initials?.sq)
  const [squareXY, setSquareXY] = useState(() => initials?.sqxy)
  const [gradientLeft, setGradientLeft] = useState(initials?.gl)

  const hsl = [hue, square[0], square[1]]

  useEffect(() => {
    let newColor = `hsla(${hue}, ${square[0]}%, ${square[1]}%, ${opacity / 100})`
    if (isGradient) {
      let colorsCopy = colors
      colorsCopy[selectedColor] = {value: newColor, left: gradientLeft, opacity: opacity, hsl: hsl}
      let deepCopy = cloneDeep(colors)
      let sorted = deepCopy.sort((a, b) => a.left - b.left)
      let colorString = sorted?.map((cc) => `${cc?.value} ${cc.left}%`)
      let newGrad = `${getGradientType(value)}, ${colorString.join(', ')})`
      if (getGradientType(value)) {
        setColor(newGrad)
        onChange(newGrad)
      }
    } else {
      setColor(newColor)
      onChange(newColor)
    }
  }, [hue, square, opacity, gradientLeft])

  function handleOpacity(e) {
    const x = computeBarPosition(e, offsetLeft)
    const o = computeOpacity(x)
    setOpacityX(x)
    setOpacity(o)
  }

  function handleHue(e) {
    const x = computeBarPosition(e, offsetLeft)
    const hue = computeHue(x)
    setHueX(x)
    setHue(hue)
  }

  function handleColor(e, ctx) {
    const [x, y] = computePickerPosition(e, offsetLeft, offsetTop)
    const x1 = Math.min(x + crossSize / 2, squareSize - 1)
    const y1 = Math.min(y + crossSize / 2, squareSize - 1)
    const [r, g, b] = ctx.getImageData(x1, y1, 1, 1).data
    const [h, s, l] = convertRGBtoHSL([r, g, b])
    setSquare([s, l])
    setSquareXY([x, y])
  }

  const handleSelectedColor = (e, index) => {
    e.stopPropagation()
    let newS = colors[index]
    setSelectedColor(index);
    setColor(newS?.value)
    setHue(newS?.hsl[0])
    setHueX(computeHueX(newS.hsl[0]))
    setOpacity(newS?.opacity)
    setOpacityX(newS?.opacity * 2.80)
    setSquare([newS?.hsl[1], newS?.hsl[2]])
    setSquareXY(computeSquareXY(newS?.hsl[1], newS?.hsl[2]))
    setGradientLeft(newS?.left)
  }

  const addPoint = (e) => {
    let newIndex = colors.length
    let left = computeBarPosition(e, offsetLeft)
    colors.push({value: color, left: left / 2.8, opacity: 100, hsl: hsl })
    handleSelectedColor(e, newIndex)
  }

  const deletePoint = (index) => {
    if (colors?.length > 1) {
      let remaining = colors?.filter((rc, i) => i !== index)
      colors = remaining
    }
  }

  const pickerState = {
    hsl,
    hue,
    hueX,
    color,
    colors,
    addPoint,
    opacityX,
    squareXY,
    setColor,
    handleHue,
    offsetLeft,
    handleColor,
    deletePoint,
    handleOpacity,
    setGradientLeft,
    handleSelectedColor
  };

  return <PickerContext.Provider value={pickerState}>{children}</PickerContext.Provider>;
}

export function usePicker() {
  return useContext(PickerContext);
}
