import React, { useRef, useState, useEffect } from 'react'
import usePaintSquare from '../hooks/usePaintSquare.js'
import throttle from 'lodash.throttle'
import { usePicker } from '../context.js'
import tinycolor from 'tinycolor2'
import { computePickerPosition, computeSquareXY } from '../utils/utils.js'

const Square = () => {
  const { hc, classes, squareWidth, squareHeight, handleChange, config } = usePicker()
  const { crossSize } = config
  const [dragging, setDragging] = useState(false)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [x, y] = computeSquareXY(hc?.s, hc?.v * 100, squareWidth, squareHeight, crossSize)
  const [dragPos, setDragPos] = useState({ x, y })

  usePaintSquare(canvas, hc?.h, squareWidth, squareHeight)

  useEffect(() => {
    if (!dragging) {
      setDragPos({ x: hc?.v === 0 ? dragPos.x : x, y })
    }
  }, [x, y])

  const handleColor = (e: any) => {
    const onMouseMove = throttle(() => {
      const [x, y] = computePickerPosition(e, crossSize)
      if (x && y) {
        const x1 = Math.min(x + crossSize / 2, squareWidth - 1)
        const y1 = Math.min(y + crossSize / 2, squareHeight - 1)
        const newS = (x1 / squareWidth) * 100
        const newY = 100 - (y1 / squareHeight) * 100
        setDragPos({ x: newY === 0 ? dragPos?.x : x, y })
        const updated = tinycolor(
          `hsva(${hc?.h}, ${newS}%, ${newY}%, ${hc?.a})`
        )
        handleChange(updated.toRgbString())
      }
    }, 250)

    onMouseMove()
  }

  const stopDragging = () => {
    setDragging(false)
  }

  const handleMove = (e: any) => {
    if (dragging) {
      handleColor(e)
    }
  }

  // const handleTouchMove = (e: any) => {
  //   if (dragging && isMobile) {
  //     document.body.style.overflow = 'hidden'
  //     handleColor(e)
  //   }
  // }

  const handleClick = (e: any) => {
    if (!dragging) {
      handleColor(e)
    }
  }

  const handleMouseDown = () => {
    setDragging(true)
  }

  const handleCanvasDown = (e: any) => {
    setDragging(true)
    handleColor(e)
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
        onMouseUp={stopDragging}
        onTouchEnd={stopDragging}
        onMouseDown={handleCanvasDown}
        onTouchStart={handleCanvasDown}
        onMouseMove={(e) => handleMove(e)}
        style={{ position: 'relative', cursor: 'ew-cross' }}
        // onTouchMove={(e) => handleTouchMove(e)}
      >
        <div
          className={classes.rbgcpHandle}
          style={{
            left: dragPos?.x,
            top: dragPos?.y,
          }}
          onMouseDown={handleMouseDown}
          role="button"
          tabIndex={0}
        />
        <div
          className={classes.rbgcpCanvasWrapper}
          style={{ height: squareHeight }}
          onClick={(e) => handleClick(e)}
        >
          <canvas
            ref={canvas}
            id="paintSquare"
            width={`${squareWidth}px`}
            height={`${squareHeight}px`}
          />
        </div>
      </div>
    </div>
  )
}

export default Square
