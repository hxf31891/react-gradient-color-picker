import React, { useRef, useState } from "react"
import throttle from "lodash.throttle"
import usePaintSquare from "./usePaintSquare"
import { usePicker } from './context'
import { psRl, cCross, handle, canvasWrapper } from './style';

const Square = () => {
  const { handleColor, x, y, internalHue, squareSize } = usePicker();
  const [dragging, setDragging] = useState(false);
  const canvas = useRef(null);
  usePaintSquare(canvas, internalHue, squareSize);

  const handleChange = (e) => {
    const ctx = canvas?.current?.getContext("2d");
    const onMouseMove = throttle(() => handleColor(e, ctx), 250)
    onMouseMove()
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

  return (
    <div style={psRl}>
      <div style={{position: 'absolute', left: -7, top: -7, width: squareSize + 14 , height: squareSize + 14 }} onMouseEnter={stopDragging} />
      <div style={{ ...psRl, ...cCross }} onMouseMove={(e) => handleMove(e)} onMouseUp={stopDragging}>
        <div style={{ left: x, top: y, ...handle }} onMouseDown={() => setDragging(true)} />
        <div style={{ ...canvasWrapper, height: squareSize }} onClick={(e) => handleClick(e)}>
          <canvas ref={canvas} width={`${squareSize}px`} height={`${squareSize}px`} id='paintSquare' />
        </div>
      </div>
    </div>
  )
}

export default Square
