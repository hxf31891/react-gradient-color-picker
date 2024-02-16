import React, { useRef, useState, useEffect } from 'react'
import { usePicker } from '../context.js'
import usePaintHue from '../hooks/usePaintHue.js'
import { getHandleValue } from '../utils/utils.js'
import tinycolor from 'tinycolor2'

const Hue = () => {
  const barRef = useRef<HTMLCanvasElement>(null)
  const { handleChange, squareWidth, hc, setHc } = usePicker()
  const [dragging, setDragging] = useState(false)
  usePaintHue(barRef, squareWidth)

  const stopDragging = () => {
    setDragging(false)
  }

  const handleDown = () => {
    setDragging(true)
  }

  const handleHue = (e: any) => {
    const newHue = getHandleValue(e) * 3.6
    const tinyHsv = tinycolor({ h: newHue, s: hc?.s, v: hc?.v })
    const { r, g, b } = tinyHsv.toRgb()
    handleChange(`rgba(${r}, ${g}, ${b}, ${hc.a})`)
    setHc({ ...hc, h: newHue })
  }

  const handleMove = (e: any) => {
    if (dragging) {
      handleHue(e)
    }
  }

  const handleClick = (e: any) => {
    if (!dragging) {
      handleHue(e)
    }
  }

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
      style={{
        height: 14,
        marginTop: 17,
        marginBottom: 4,
        cursor: 'ew-resize',
        position: 'relative',
      }}
      onMouseMove={(e) => handleMove(e)}
    >
      <div
        role="button"
        style={{
          border: '2px solid white',
          borderRadius: '50%',
          boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
          width: '18px',
          height: '18px',
          zIndex: 1000,
          transition: 'all 10ms linear',
          position: 'absolute',
          left: hc?.h * ((squareWidth - 18) / 360),
          top: -2,
          cursor: 'ew-resize',
          boxSizing: 'border-box',
        }}
        onMouseDown={handleDown}
      />
      <canvas
        ref={barRef}
        height="14px"
        width={`${squareWidth}px`}
        onClick={(e) => handleClick(e)}
        style={{ position: 'relative', borderRadius: 14, verticalAlign: 'top' }}
      />
    </div>
  )
}

export default Hue
