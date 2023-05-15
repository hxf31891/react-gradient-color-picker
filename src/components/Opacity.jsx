import React, { useState, useEffect } from 'react'
import { usePicker } from '../context'
import {
  psRl,
  cResize,
  handle,
  opacityOverlay,
  borderBox,
  checkered
} from '../style'

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

  let left = squareSize - 18

  // const handleKeyboard = (e) => {
  //   if (inFocus === 'opacityHandle') {
  //       if (e.keyCode === 37) {
  //         let newValue = Math.max(opacity * 100 - 1, 0);
  //         handleOpacity({ type: 'picker-keyboard', value: newValue })
  //       } else if (e.keyCode === 39) {
  //         let newValue = Math.min(opacity * 100 + 1, 100);
  //         handleOpacity({ type: 'picker-keyboard', value: newValue })
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
  // }, [opacity, inFocus, value]);

  useEffect(() => {
    const handleUp = () => {
      stopDragging();
    }

    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <div
      onMouseDown={handleDown}
      onMouseMove={(e) => handleMove(e)}
      style={{ ...cResize, ...psRl, height: 14, ...borderBox, marginTop: 17, marginBottom: 4 }}
    >
      <div style={{ ...checkered, width: '100%', height: 14 }} />
      <div style={{ left: left * opacity, top: -2, ...handle }} />
      <div
        style={{ background: bg, ...opacityOverlay }}
        onClick={(e) => handleClick(e)}
      />
    </div>
  )
}

export default Opacity;
