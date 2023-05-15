import React, { useRef, useState, useEffect } from 'react'
// import throttle from 'lodash.throttle'
import usePaintSquare from '../hooks/usePaintSquare'
import { usePicker } from '../context'
import { psRl, cCross, handle, canvasWrapper } from '../style'

const Square = () => {
  const {
    x,
    y,
    handleColor,
    internalHue,
    squareSize,
    squareHeight,
  } = usePicker()
  const [dragging, setDragging] = useState(false)
  const canvas = useRef(null)
  usePaintSquare(canvas, internalHue, squareSize, squareHeight)

  const handleChange = (e) => {
    const ctx = canvas?.current?.getContext('2d', { willReadFrequently: true })
    // const onMouseMove = throttle(() => handleColor(e, ctx), 250)
    handleColor(e, ctx)
    // onMouseMove()
  }

  const stopDragging = () => {
    setDragging(false)
  }

  const handleMove = (e) => {
    if (dragging) {
      handleChange(e)
    }
  }

  const handleClick = (e) => {
    if (!dragging) {
      handleChange(e)
    }
  }

  const handleMouseDown = () => {
    setDragging(true)
  }

  const handleCanvasDown = (e) => {
    setDragging(true)
    handleChange(e)
  }

  useEffect(() => {
    const handleUp = () => {
      stopDragging();
    }

    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  // const handleKeyboard = (e) => {
  //   if (inFocus === 'squareHandle') {
  //     const ctx = canvas?.current?.getContext('2d', { willReadFrequently: true })
  //       if (e.keyCode === 37) {
  //         handleColor({ type: 'picker-keyboard', x: Math.max(x - 1, 0), y: y }, ctx);
  //       } else if (e.keyCode === 39) {
  //         handleColor({ type: 'picker-keyboard', x: Math.min(x + 1, 100), y: y }, ctx);
  //       }
  //   }
  // }
  //
  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyboard);
  //
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyboard);
  //   };
  // }, [value, inFocus, x, y]);

  return (
    <div style={psRl}>
      <div
        style={{ ...psRl, ...cCross }}
        onMouseDown={handleCanvasDown}
        onMouseMove={(e) => handleMove(e)}
        onMouseUp={stopDragging}
      >
        <div
          style={{ left: x, top: y, ...handle }}
          onMouseDown={handleMouseDown}
        />
        <div
          style={{ ...canvasWrapper, height: squareHeight }}
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
