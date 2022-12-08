import React, { useState, useEffect } from 'react'
import { getHandleValue } from '../utils/utils'
import { usePicker } from '../context'
import {
  barWrap,
  psRl,
  barWrapInner,
  df,
  jc,
  ac,
  gradientHandleWrap,
  gradientHandle,
} from '../style'

const GradientBar = () => {
  const {
    currentColor,
    addPoint,
    colors,
    value,
    handleGradient,
    squareSize,
    deletePoint,
    isGradient,
    selectedColor,
    inFocus,
    setInFocus,
  } = usePicker()
  const [dragging, setDragging] = useState(false)

  function force90degLinear(color) {
    return color.replace(
      /(radial|linear)-gradient\([^,]+,/,
      'linear-gradient(90deg,'
    )
  }

  useEffect(() => {
    let selectedEl = window?.document?.getElementById(
      `gradient-handle-${selectedColor}`
    )
    selectedEl.focus()
  }, [selectedColor])

  const stopDragging = () => {
    setDragging(false)
  }

  const handleDown = (e) => {
    if (!dragging) {
      addPoint(e)
      setDragging(true)
    }
  }

  const handleMove = (e) => {
    if (dragging) {
      handleGradient(currentColor, getHandleValue(e))
    }
  }

  const handleKeyboard = (e) => {
    if (isGradient) {
      if (e.keyCode === 8) {
        if (inFocus === 'gpoint') {
          deletePoint()
        }
      }
    }
  }

  useEffect(() => {
    window?.addEventListener('keydown', handleKeyboard)

    return () => {
      window?.removeEventListener('keydown', handleKeyboard)
    }
  })

  return (
    <div
      onMouseEnter={stopDragging}
      onMouseLeave={stopDragging}
      style={{ ...barWrap, width: squareSize + 36 }}
    >
      <div
        id="gradient-bar"
        onMouseUp={stopDragging}
        style={{ ...psRl, ...barWrapInner, width: squareSize + 30 }}
      >
        <div
          onMouseDown={(e) => handleDown(e)}
          onMouseMove={(e) => handleMove(e)}
          style={{ paddingTop: 6, paddingBottom: 6 }}
        >
          <div
            style={{
              width: squareSize,
              height: 14,
              backgroundImage: force90degLinear(value),
              borderRadius: 10,
            }}
          />
        </div>
        {colors?.map((c, i) => (
          <Handle
            i={i}
            left={c.left}
            key={`${i}-${c}`}
            setInFocus={setInFocus}
            setDragging={setDragging}
          />
        ))}
      </div>
    </div>
  )
}

export default GradientBar

export const Handle = ({ left, i, setDragging, setInFocus }) => {
  const { setSelectedColor, selectedColor, squareSize } = usePicker()
  const isSelected = selectedColor === i
  const leftMultiplyer = (squareSize - 18) / 100

  const handleDown = (e) => {
    e.stopPropagation()
    setSelectedColor(i)
    setDragging(true)
  }

  const handleFocus = () => {
    setInFocus('gpoint')
    setSelectedColor(i)
  }

  const handleBlur = () => {
    setInFocus(null)
  }

  return (
    <div
      tabIndex={0}
      onBlur={handleBlur}
      onFocus={handleFocus}
      id={`gradient-handle-${i}`}
      onMouseDown={(e) => handleDown(e)}
      style={{ left: left * leftMultiplyer + 13, ...gradientHandleWrap }}
    >
      <div
        style={{
          ...handleStyle(isSelected),
          ...gradientHandle,
          ...df,
          ...jc,
          ...ac,
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
          />
        )}
      </div>
    </div>
  )
}

const handleStyle = (isSelected) => {
  return {
    boxShadow: isSelected ? '0px 0px 5px 1px rgba(86, 140, 245,.95)' : '',
    border: isSelected ? '2px solid white' : '2px solid rgba(255,255,255,.75)',
  }
}
