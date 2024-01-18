import React, { useState, useRef, useEffect } from 'react'
import { usePicker } from '../context.js'
import { getHandleValue } from '../utils/utils.js'
import {
  usePaintSat,
  usePaintLight,
  usePaintBright,
} from '../hooks/usePaintHue.js'
import tinycolor from 'tinycolor2'

const AdvBar = ({
  value,
  callback,
  reffy,
  openAdvanced,
  label,
}: {
  value: number
  callback: (arg0: number) => void
  reffy: any
  openAdvanced: boolean
  label: string
}) => {
  const { squareSize } = usePicker()
  const [dragging, setDragging] = useState<boolean>(false)
  const [handleTop, setHandleTop] = useState<number>(2)
  // const sliderId = `${label?.toLowerCase()}Handle`
  const left = value * (squareSize - 18)

  useEffect(() => {
    setHandleTop(reffy?.current?.offsetTop - 2)
  }, [openAdvanced, reffy])

  const stopDragging = () => {
    setDragging(false)
  }

  const handleMove = (e: any) => {
    if (dragging) {
      callback(getHandleValue(e))
    }
  }

  const handleClick = (e: any) => {
    if (!dragging) {
      callback(getHandleValue(e))
    }
  }

  const handleDown = () => {
    setDragging(true)
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
    <div style={{ width: '100%', padding: '3px 0px 3px 0px' }}>
      <div className="c-resize ps-rl" onMouseMove={(e) => handleMove(e)}>
        <div
          style={{ left, top: handleTop }}
          onMouseDown={handleDown}
          className="rbgcp-handle"
          role="button"
          tabIndex={0}
        />
        <div
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 12,
            fontWeight: 500,
            lineHeight: 1,
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, 0%)',
            top: handleTop + 2,
            zIndex: 10,
            textShadow: '1px 1px 1px rgba(0,0,0,.6)',
          }}
          onMouseMove={(e) => handleMove(e)}
          onClick={(e) => handleClick(e)}
        >
          {label}
        </div>
        <canvas
          ref={reffy}
          width={`${squareSize}px`}
          height="14px"
          style={{ position: 'relative', borderRadius: 14 }}
          onClick={(e) => handleClick(e)}
        />
      </div>
    </div>
  )
}

const AdvancedControls = ({ openAdvanced }: { openAdvanced: boolean }) => {
  const { tinyColor, hue, l, handleChange, s, opacity, squareSize } =
    usePicker()
  const { v, s: vs } = tinyColor.toHsv()
  const satRef = useRef(null)
  const lightRef = useRef(null)
  const brightRef = useRef(null)
  usePaintSat(satRef, hue, l * 100, squareSize)
  usePaintLight(lightRef, hue, s * 100, squareSize)
  usePaintBright(brightRef, hue, s * 100, squareSize)

  const satDesat = (value: number) => {
    const { r, g, b } = tinycolor({ h: hue, s: value / 100, l }).toRgb()
    handleChange(`rgba(${r},${g},${b},${opacity})`)
  }

  const setLight = (value: number) => {
    const { r, g, b } = tinycolor({ h: hue, s, l: value / 100 }).toRgb()
    handleChange(`rgba(${r},${g},${b},${opacity})`)
  }

  const setBright = (value: number) => {
    const { r, g, b } = tinycolor({ h: hue, s: vs * 100, v: value }).toRgb()
    handleChange(`rgba(${r},${g},${b},${opacity})`)
  }

  return (
    <div
      style={{
        height: openAdvanced ? 98 : 0,
        width: '100%',
        transition: 'all 120ms linear',
      }}
    >
      <div
        style={{
          paddingTop: 11,
          display: openAdvanced ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: openAdvanced ? 98 : 0,
          overflow: 'hidden',
          transition: 'height 100ms linear',
        }}
      >
        <AdvBar
          value={s}
          reffy={satRef}
          callback={satDesat}
          openAdvanced={openAdvanced}
          label="Saturation"
        />
        <AdvBar
          value={l}
          reffy={lightRef}
          label="Lightness"
          callback={setLight}
          openAdvanced={openAdvanced}
        />
        <AdvBar
          value={v}
          reffy={brightRef}
          label="Brightness"
          callback={setBright}
          openAdvanced={openAdvanced}
        />
      </div>
    </div>
  )
}

export default AdvancedControls
