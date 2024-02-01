import React, { useState, useEffect } from 'react'
import { getHandleValue } from '../utils/utils.js'
import { usePicker } from '../context.js'
import { low, high } from '../utils/formatters.js'
import { GradientProps } from '../shared/types.js'

const handleStyle = (isSelected: boolean) => {
  return {
    boxShadow: isSelected ? '0px 0px 5px 1px rgba(86, 140, 245,.95)' : '',
    border: isSelected ? '2px solid white' : '2px solid rgba(255,255,255,.75)',
  }
}

export const Handle = ({
  left,
  i,
  setDragging,
  setInFocus,
}: {
  left?: number
  i: number
  setDragging: (arg0: boolean) => void
  setInFocus: (arg0: string | null) => void
}) => {
  const { colors, selectedColor, squareWidth, classes, createGradientStr } =
    usePicker()
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

  const handleFocus = () => {
    // setInFocus('gpoint')
    setSelectedColor(i)
  }

  const handleBlur = () => {
    // setInFocus(null)
  }

  return (
    <div
      tabIndex={0}
      onBlur={handleBlur}
      onFocus={handleFocus}
      id={`gradient-handle-${i}`}
      onMouseDown={(e) => handleDown(e)}
      className={classes.rbgcpGradientHandleWrap}
      style={{ left: (left || 0) * leftMultiplyer }}
    >
      <div
        style={handleStyle(isSelected)}
        className={classes.rbgcpGradientHandle}
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

const GradientBar = () => {
  const {
    currentColor,
    createGradientStr,
    colors,
    value,
    handleGradient,
    squareWidth,
    deletePoint,
    isGradient,
    selectedColor,
  } = usePicker()
  const [dragging, setDragging] = useState(false)
  const [inFocus, setInFocus] = useState<string | null>(null)

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

  useEffect(() => {
    const selectedEl = window?.document?.getElementById(
      `gradient-handle-${selectedColor}`
    )
    if (selectedEl) {
      selectedEl.focus()
    }
  }, [selectedColor])

  const stopDragging = () => {
    setDragging(false)
  }

  const handleDown = (e: any) => {
    if (!dragging) {
      addPoint(e)
      setDragging(true)
    }
  }

  const handleMove = (e: any) => {
    if (dragging) {
      handleGradient(currentColor, getHandleValue(e))
    }
  }

  const handleKeyboard = (e: any) => {
    if (isGradient) {
      if (e.keyCode === 8) {
        if (inFocus === 'gpoint') {
          deletePoint()
        }
      }
    }
  }

  const handleUp = () => {
    stopDragging()
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleUp)
    window?.addEventListener('keydown', handleKeyboard)

    return () => {
      window.removeEventListener('mouseup', handleUp)
      window?.removeEventListener('keydown', handleKeyboard)
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
      id="gradient-bar"
    >
      <div
        style={{
          width: squareWidth,
          height: 14,
          backgroundImage: force90degLinear(value),
          borderRadius: 10,
        }}
        onMouseDown={(e) => handleDown(e)}
        onMouseMove={(e) => handleMove(e)}
      />
      {colors?.map((c: any, i) => (
        <Handle
          i={i}
          left={c.left}
          key={`${i}-${c}`}
          setInFocus={setInFocus}
          setDragging={setDragging}
        />
      ))}
    </div>
  )
}

export default GradientBar
