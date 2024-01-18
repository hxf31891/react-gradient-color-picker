import React, { useRef, useState, useEffect } from 'react'
import usePaintSquare from '../hooks/usePaintSquare.js'
import throttle from 'lodash.throttle'
import { usePicker } from '../context.js'

const Square = () => {
  const { x, y, isMobile, squareSize, handleColor, internalHue, squareHeight } =
    usePicker()
  const [dragging, setDragging] = useState(false)
  const canvas = useRef<HTMLCanvasElement>(null)
  usePaintSquare(canvas, internalHue, squareSize, squareHeight)

  const handleChange = (e: any) => {
    const ctx = canvas?.current?.getContext('2d', { willReadFrequently: true })
    const onMouseMove = throttle(() => handleColor(e, ctx), 100)
    // handleColor(e, ctx)
    onMouseMove()
  }

  const stopDragging = () => {
    setDragging(false)
    document.body.style.overflow = 'auto'
  }

  const handleMove = (e: any) => {
    if (dragging && !isMobile) {
      handleChange(e)
    }
  }

  const handleTouchMove = (e: any) => {
    if (dragging && isMobile) {
      document.body.style.overflow = 'hidden'
      handleChange(e)
    }
  }

  const handleClick = (e: any) => {
    if (!dragging) {
      handleChange(e)
    }
  }

  const handleMouseDown = () => {
    setDragging(true)
  }

  const handleCanvasDown = (e: any) => {
    setDragging(true)
    handleChange(e)
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
    <div style={{ position: 'relative' }}>
      <div
        className="ps-rl c-cross"
        onMouseUp={stopDragging}
        onTouchEnd={stopDragging}
        onMouseDown={handleCanvasDown}
        onTouchStart={handleCanvasDown}
        onMouseMove={(e) => handleMove(e)}
        onTouchMove={(e) => handleTouchMove(e)}
      >
        <div
          className="rbgcp-handle"
          style={{ left: x, top: y }}
          onMouseDown={handleMouseDown}
          role="button"
          tabIndex={0}
        />
        <div
          className="rbgcp-canvas-wrapper"
          style={{ height: squareHeight }}
          onClick={(e) => handleClick(e)}
        >
          <canvas
            ref={canvas}
            width={`${squareSize}px`}
            height={`${squareHeight}px`}
            id="paintSquare"
          />
        </div>
      </div>
    </div>
  )
}

export default Square
