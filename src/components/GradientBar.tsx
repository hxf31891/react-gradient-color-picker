/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-leaked-render */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react'
import { getHandleValue } from '../utils/utils.js'
import { usePicker } from '../context.js'
import { low, high } from '../utils/formatters.js'
import { GradientProps } from '../shared/types.js'

export const Handle = ({
  left,
  i,
  setDragging,
}: {
  left?: number
  i: number
  setDragging: (arg0: boolean) => void
}) => {
  const {
    colors,
    squareWidth,
    selectedColor,
    defaultStyles,
    pickerIdSuffix,
    createGradientStr,
  } = usePicker()
  const isSelected = selectedColor === i
  const leftMultiplyer = (squareWidth - 18) / 100

  const setSelectedColor = (index: number) => {
    const newGradStr = colors?.map((cc: GradientProps, i: number) => ({
      ...cc,
      value: i === index ? high(cc) : low(cc),
    }))
    createGradientStr(newGradStr)
  }

  const handleDown = (e: any) => {
    e.stopPropagation()
    setSelectedColor(i)
    setDragging(true)
  }

  // const handleFocus = () => {
  //   setInFocus('gpoint')
  //   setSelectedColor(i)
  // }

  // const handleBlur = () => {
  //   setInFocus(null)
  // }

  return (
    <div
      // tabIndex={0}
      // onBlur={handleBlur}
      // onFocus={handleFocus}
      onMouseDown={(e) => handleDown(e)}
      id={`rbgcp-gradient-handle-${i}${pickerIdSuffix}`}
      // className="rbgcp-gradient-handle-wrap"
      style={{
        ...defaultStyles.rbgcpGradientHandleWrap,
        left: (left ?? 0) * leftMultiplyer,
      }}
    >
      <div
        // className="rbgcp-gradient-handle"
        style={{
          ...defaultStyles.rbgcpGradientHandle,
          ...(isSelected
            ? {
                boxShadow: '0px 0px 5px 1px rgba(86, 140, 245,.95)',
                border: '2px solid white',
              }
            : {}),
        }}
        id={`rbgcp-gradient-handle-${i}-dot${pickerIdSuffix}`}
      >
        {isSelected && (
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'white',
            }}
            id={`rbgcp-gradient-handle-${i}-selected-dot${pickerIdSuffix}`}
          />
        )}
      </div>
    </div>
  )
}

const GradientBar = () => {
  const {
    value,
    colors,
    squareWidth,
    currentColor,
    handleGradient,
    pickerIdSuffix,
    createGradientStr,
  } = usePicker()
  const [dragging, setDragging] = useState(false)
  // const [inFocus, setInFocus] = useState<string | null>(null)

  function force90degLinear(color: string) {
    return color.replace(
      /(radial|linear)-gradient\([^,]+,/,
      'linear-gradient(90deg,'
    )
  }

  const addPoint = (e: any) => {
    const left = getHandleValue(e)
    const newColors = [
      ...colors.map((c: any) => ({ ...c, value: low(c) })),
      { value: currentColor, left: left },
    ]?.sort((a, b) => a.left - b.left)
    createGradientStr(newColors)
  }

  // useEffect(() => {
  //   const selectedEl = window?.document?.getElementById(
  //     `gradient-handle-${selectedColor}`
  //   )
  //   if (selectedEl) selectedEl.focus()
  // }, [selectedColor])

  const stopDragging = () => {
    setDragging(false)
  }

  const handleDown = (e: any) => {
    if (dragging) return;
    addPoint(e)
    setDragging(true)
  }

  const handleMove = (e: any) => {
    if (dragging) handleGradient(currentColor, getHandleValue(e))
  }

  // const handleKeyboard = (e: any) => {
  //   if (isGradient) {
  //     if (e.keyCode === 8) {
  //       if (inFocus === 'gpoint') {
  //         deletePoint()
  //       }
  //     }
  //   }
  // }

  const handleUp = () => {
    stopDragging()
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleUp)
    // window?.addEventListener('keydown', handleKeyboard)

    return () => {
      window.removeEventListener('mouseup', handleUp)
      // window?.removeEventListener('keydown', handleKeyboard)
    }
  })

  return (
    <div
      style={{
        width: '100%',
        marginTop: 17,
        marginBottom: 4,
        position: 'relative',
      }}
      id={`rbgcp-gradient-bar${pickerIdSuffix}`}
      // className="rbgcp-gradient-bar"
    >
      <div
        style={{
          height: 14,
          borderRadius: 10,
          width: squareWidth,
          backgroundImage: force90degLinear(value),
        }}
        onMouseDown={(e) => handleDown(e)}
        onMouseMove={(e) => handleMove(e)}
        id={`rbgcp-gradient-bar-canvas${pickerIdSuffix}`}
        // className="rbgcp-gradient-bar-canvas"
      />
      {colors?.map((c: any, i) => (
        <Handle
          i={i}
          left={c.left}
          key={`${i}-${c}`}
          setDragging={setDragging}
        />
      ))}
    </div>
  )
}

export default GradientBar
