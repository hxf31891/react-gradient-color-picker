import React, { useState, useEffect } from 'react'
import { usePicker } from '../context.js'

const Opacity = () => {
  const { handleOpacity, opacity, tinyColor, squareSize } = usePicker()
  const [dragging, setDragging] = useState(false)
  const { r, g, b } = tinyColor.toRgb()
  const bg = `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(${r},${g},${b},.5) 100%)`

  const stopDragging = () => {
    setDragging(false)
  }

  const handleDown = () => {
    setDragging(true)
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

  const left = squareSize - 18

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
      className="c-resize ps-rl"
      style={{ height: 14, marginTop: 17, marginBottom: 4 }}
    >
      <div style={{ width: '100%', height: 14 }} className="rbgcp-checkered" />
      <div style={{ left: left * opacity, top: -2 }} className="rbgcp-handle" />
      <div
        style={{ background: bg }}
        className="rbgcp-opacity-overlay"
        onClick={(e) => handleClick(e)}
      />
    </div>
  )
}

export default Opacity
