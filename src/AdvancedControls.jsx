import React, { useState, useRef, useEffect } from 'react'
import { usePicker } from './context'
import { getHandleValue } from './utils'
import { usePaintSat, usePaintLight, usePaintBright } from './usePaintHue'
import { barWrap, psRl, barWrapInner, cResize, handle } from './style'

const tinycolor = require('tinycolor2')

const AdvancedControls = ({ openAdvanced }) => {
  const {
    tinyColor,
    hue,
    l,
    handleChange,
    s,
    opacity,
    squareSize,
  } = usePicker()
  const { v, s: vs } = tinyColor.toHsv()
  const satRef = useRef(null)
  const lightRef = useRef(null)
  const brightRef = useRef(null)
  usePaintSat(satRef, hue, l * 100, squareSize)
  usePaintLight(lightRef, hue, s * 100, squareSize)
  usePaintBright(brightRef, hue, s * 100, squareSize)

  const satDesat = value => {
    const { r, g, b } = tinycolor({ h: hue, s: value / 100, l }).toRgb()
    handleChange(`rgba(${r},${g},${b},${opacity})`)
  }

  const setLight = value => {
    const { r, g, b } = tinycolor({ h: hue, s, l: value / 100 }).toRgb()
    handleChange(`rgba(${r},${g},${b},${opacity})`)
  }

  const setBright = value => {
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
      <div style={{ paddingTop: 11, display: openAdvanced ? '' : 'none' }}>
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

const AdvBar = ({ value, callback, reffy, openAdvanced, label }) => {
  const { squareSize, inFocus } = usePicker()
  const [dragging, setDragging] = useState(false)
  const [handleTop, setHandleTop] = useState(2);
  const sliderId = `${label?.toLowerCase()}Handle`
  let left = value * (squareSize - 18)

  useEffect(() => {
    setHandleTop(reffy?.current?.offsetTop - 2)
  }, [openAdvanced, reffy])

  const stopDragging = () => {
    setDragging(false)
  }

  const handleMove = e => {
    if (dragging) {
      callback(getHandleValue(e))
    }
  }

  const handleClick = e => {
    if (!dragging) {
      callback(getHandleValue(e))
    }
  }

  const handleDown = () => {
    setDragging(true)
  }

  // const handleKeyboard = (e) => {
  //   if (inFocus === sliderId && openAdvanced) {
  //       if (e.keyCode === 37) {
  //         const newValue = value * 100 - 1;
  //         callback(Math.max(newValue, 0));
  //       } else if (e.keyCode === 39) {
  //         const newValue = value * 100 + 1;
  //         callback(Math.min(newValue, 100));
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
  // }, [value, inFocus, openAdvanced]);

  return (
    <div
      onMouseEnter={stopDragging}
      onMouseLeave={stopDragging}
      style={{ ...barWrap, width: squareSize + 36, marginTop: 0 }}
    >
      <div
        onMouseUp={stopDragging}
        style={{ ...psRl, ...barWrapInner, width: squareSize + 30 }}
      >
        <div
          className="c-resize ps-rl"
          onMouseMove={e => handleMove(e)}
          style={{ ...cResize, ...psRl }}
        >
          <div
            style={{ ...handle, left, top: handleTop }}
            onMouseDown={handleDown}
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
            onMouseMove={e => handleMove(e)}
            onClick={e => handleClick(e)}
          >
            {label}
          </div>
          <canvas
            ref={reffy}
            width={`${squareSize}px`}
            height="14px"
            style={{ position: 'relative', borderRadius: 14 }}
            onClick={e => handleClick(e)}
          />
        </div>
      </div>
    </div>
  )
}
