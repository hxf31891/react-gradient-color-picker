import React, { useState } from "react"
import { usePicker } from './context'
import { GradientBg } from './components'

const Opacity = () => {
  const { handleOpacity, opacity, tinyColor } = usePicker();
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

  return(
    <div className='bar-wrap' onMouseEnter={stopDragging} onMouseLeave={stopDragging} style={{marginTop: 3}}>
      <div className='bar-wrap-inner' onMouseUp={stopDragging}>
        <div className='c-resize ps-rl' onMouseDown={handleDown} onMouseMove={(e) => handleMove(e)}>
          <div style={{left: 276 * opacity, top: -2}} className='handle' />
          <div className='opacity-overlay' style={{background: bg}} onClick={(e) => handleClick(e)} />
          <GradientBg />
        </div>
      </div>
    </div>
  )
}

export default Opacity
