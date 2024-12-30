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
    selectedColor,
    squareWidth,
    defaultStyles,
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
      id={`gradient-handle-${i}`}
      onMouseDown={(e) => handleDown(e)}
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
          ...(isSelected ? { boxShadow: '0px 0px 5px 1px rgba(86, 140, 245,.95)', border: '2px solid white' } : {}),
        }}
      >
        {isSelected && (
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'white',
            }}
            // className="rbgcp-gradient-handle-selected-dot"
          />
        )}
      </div>
    </div>
  )
}

const GradientBar = () => {
  const {
    currentColor,
    createGradientStr,
    colors,
    value,
    handleGradient,
    squareWidth
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

  // Register global event listeners for mouse and touch events
  useEffect(() => {
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleMove)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('touchend', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchend', handleUp)
    }
  }, [dragging])

  return (
    <div
      style={{
        width: '100%',
        marginTop: 17,
        marginBottom: 4,
        position: 'relative',
      }}
      id="gradient-bar"
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
        onTouchStart={(e) => handleDown(e)}
        // onMouseMove={(e) => handleMove(e)}
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
