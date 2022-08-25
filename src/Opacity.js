import React, { useState } from "react"
import { usePicker } from './context'

const Opacity = () => {
  const { handleOpacity, opacity, tinyColor, squareSize } = usePicker();
  const [dragging, setDragging] = useState(false);
  const { r, g, b } = tinyColor.toRgb();
  const bg = `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(${r},${g},${b},.5) 100%)`;

  const stopDragging = () => {
    setDragging(false)
  }

  const handleDown = () => {
    setDragging(true)
  }

  const handleMove = (e) => {
    if (dragging) {
      handleOpacity(e)
    }
  }

  const handleClick = (e) => {
    if (!dragging) {
      handleOpacity(e)
    }
  }

  let left = squareSize - 18;

  return(
    <div className='bar-wrap' onMouseEnter={stopDragging} onMouseLeave={stopDragging} style={{marginTop: 6, width: squareSize + 36}}>
      <div className='bar-wrap-inner' onMouseUp={stopDragging} style={{ width: squareSize + 30 }}>
        <div className='c-resize ps-rl' onMouseDown={handleDown} onMouseMove={(e) => handleMove(e)}>
          <div style={{ left: left * opacity, top: -2 }} className='handle' />
          <div className='opacity-overlay' style={{background: bg}} onClick={(e) => handleClick(e)} />
          <OpacityBg />
        </div>
      </div>
    </div>
  )
}

export default Opacity;

const OpacityBg = () => {
  const { squareSize } = usePicker();
  let hw = squareSize * 0.023809523809524

  return(
    <div className='opacity-bg'>
      {sqaures?.map((s, key) => (<div key={key} style={{height: 7, width: hw, background: s === 1 ? 'rgba(0,0,0,.3)' : ''}}/>))}
    </div>
  )
}

const sqaures = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
