import React, { useRef, useState } from "react"
import throttle from "lodash.throttle"
import usePaintSquare from "./usePaintSquare"
import { usePicker } from './context'

const Square = () => {
  const { handleColor, x, y, hue, setBounds, bounds } = usePicker();
  const [dragging, setDragging] = useState(false);
  const canvas = useRef(null);
  usePaintSquare(canvas, hue);

  const handleChange = (e) => {
    const ctx = canvas?.current?.getContext("2d");
    const onMouseMove = throttle(() => handleColor(e, ctx), 250)
    onMouseMove()
  }

  const stopDragging = () => {
    setDragging(false)
  }

  const stopDraggingTest = () => {
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

  return (
    <div className='ps-rl'>
      <div style={{position: 'absolute', left: -7, top: -7, width: 308, height: 308}} onMouseEnter={stopDraggingTest} />
      <div className='ps-rl c-cross' onMouseMove={(e) => handleMove(e)} onMouseUp={stopDragging}>
        <div style={{left: x, top: y}} className='handle' onMouseDown={() => setDragging(true)} />
        <div className='canvas-wrapper' onClick={(e) => handleClick(e)}>
          <canvas ref={canvas} width='294px' height='294px' />
        </div>
      </div>
    </div>
  )
}

export default Square
