import React, { useRef, useState, useEffect } from 'react'
import { usePicker } from '../context.js'
import usePaintHue from '../hooks/usePaintHue.js'

const Hue = () => {
  const barRef = useRef<HTMLCanvasElement>(null)
  const { handleHue, internalHue, squareSize } = usePicker()
  const [dragging, setDragging] = useState(false)
  usePaintHue(barRef, squareSize)

  // useEffect(() => {
  //   if (barRef?.current) {
  //     setHandleTop(barRef?.current?.offsetTop - 2)
  //   }
  // }, [barRef])

  const stopDragging = () => {
    setDragging(false)
  }

  const handleDown = () => {
    setDragging(true)
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
      style={{ height: 14, marginTop: 17, marginBottom: 4 }}
      onMouseMove={(e) => handleMove(e)}
      className="c-resize ps-rl"
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
          left: internalHue * ((squareSize - 18) / 360),
          top: -2,
        }}
        onMouseDown={handleDown}
      />
      <canvas
        ref={barRef}
        width={`${squareSize}px`}
        height="14px"
        style={{ position: 'relative', borderRadius: 14, verticalAlign: 'top' }}
        onClick={(e) => handleClick(e)}
      />
    </div>
  )
}

export default Hue
