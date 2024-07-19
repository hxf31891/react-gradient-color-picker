/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react'
import { usePicker } from '../context.js'
import { getHandleValue } from '../utils/utils.js'

const Opacity = () => {
  const { handleChange, hc = {}, squareWidth, defaultStyles } = usePicker()
  const [dragging, setDragging] = useState(false)
  const { r, g, b } = hc
  const bg = `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(${r},${g},${b},.5) 100%)`

  const stopDragging = () => {
    setDragging(false)
  }

  const handleDown = () => {
    setDragging(true)
  }

  const handleOpacity = (e: any) => {
    const newO = getHandleValue(e) / 100
    const newColor = `rgba(${r}, ${g}, ${b}, ${newO})`
    handleChange(newColor)
  }

  const handleMove = (e: any) => {
    if (dragging) {
      handleOpacity(e)
    }
  }

  const handleClick = (e: any) => {
    if (!dragging) {
      handleOpacity(e)
    }
  }

  const left = squareWidth - 18

  useEffect(() => {
    const handleUp = () => {
      stopDragging()
    }

    window.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mouseup', handleUp)
    }
  }, [])

  return (
    <div
      onMouseDown={handleDown}
      onMouseMove={(e) => handleMove(e)}
      style={{
        height: 14,
        marginTop: 17,
        marginBottom: 4,
        cursor: 'ew-resize',
        position: 'relative',
      }}
    >
      <div
        style={{ ...defaultStyles.rbgcpCheckered, width: '100%', height: 14 }}
      />
      <div
        style={{ ...defaultStyles.rbgcpHandle, left: left * hc?.a, top: -2 }}
      />
      <div
        style={{ ...defaultStyles.rbgcpOpacityOverlay, background: bg }}
        onClick={(e) => handleClick(e)}
        
      />
    </div>
  )
}

export default Opacity
