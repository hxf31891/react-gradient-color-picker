import React, { useState, useRef } from 'react'
import { usePicker } from './context'
import { getHandleValue } from './utils'
import { usePaintSat, usePaintLight, usePaintBright } from './usePaintHue'
import { barWrap, psRl, barWrapInner, cResize, handle} from './style'
var tinycolor = require("tinycolor2");

const AdvancedControls = ({ openAdvanced }) => {
  const { tinyColor, hue, l, handleChange, s, opacity, squareSize } = usePicker();
  const {v, s: vs} = tinyColor.toHsv();
  const satRef = useRef(null);
  const lightRef = useRef(null);
  const brightRef = useRef(null);
  usePaintSat(satRef, hue, l * 100, squareSize)
  usePaintLight(lightRef, hue, s * 100, squareSize)
  usePaintBright(brightRef, hue, s * 100, squareSize)

  const satDesat = (value) => {
    const {r,g,b} = tinycolor({h: hue, s: value / 100, l: l}).toRgb()
    handleChange(`rgba(${r},${g},${b},${opacity})`)
  }

  const setLight = (value) => {
    const {r,g,b} = tinycolor({h: hue, s: s, l: value / 100}).toRgb()
    handleChange(`rgba(${r},${g},${b},${opacity})`)
  }

  const setBright = (value) => {
    const {r,g,b} = tinycolor({h: hue, s: vs * 100, v: value}).toRgb()
    handleChange(`rgba(${r},${g},${b},${opacity})`)
  }

  return(
    <div style={{height: openAdvanced ? 136 : 0, width: '100%', transition: 'all 120ms linear'}}>
      <div style={{paddingTop: 11, display: openAdvanced ? '' : 'none'}}>
        <div style={{textAlign: 'center', color: '#323136', fontSize: 12, fontWeight: 500, lineHeight: 1}}>Saturation</div>
        <AdvBar left={s * squareSize - 18} reffy={satRef} callback={satDesat} />
        <div style={{textAlign: 'center', color: '#323136', fontSize: 12, fontWeight: 500, lineHeight: 1}}>Lightness</div>
        <AdvBar left={l * squareSize - 18} reffy={lightRef} callback={setLight} />
        <div style={{textAlign: 'center', color: '#323136', fontSize: 12, fontWeight: 500, lineHeight: 1}}>Brightness</div>
        <AdvBar left={v * squareSize - 18} reffy={brightRef} callback={setBright} />
      </div>
    </div>
  )
}

export default AdvancedControls;

const AdvBar = ({ left, callback, reffy }) => {
  const { squareSize } = usePicker()
  const [dragging, setDragging] = useState(false);

  const stopDragging = () => {
    setDragging(false)
  }

  const handleMove = (e) => {
    if (dragging) {
      callback(getHandleValue(e))
    }
  }

  const handleClick = (e) => {
    if (!dragging) {
      callback(getHandleValue(e))
    }
  }

  return(
    <div onMouseEnter={stopDragging} onMouseLeave={stopDragging} style={{ ...barWrap, width: squareSize + 36, marginTop: 0 }}>
      <div onMouseUp={stopDragging} style={{ ...psRl, ...barWrapInner, width: squareSize + 30 }}>
        <div className='c-resize ps-rl' onMouseMove={(e) => handleMove(e)} style={{ ...cResize, ... psRl }}>
          <div style={{ ...handle, left: left, top: 2 }} onMouseDown={() => setDragging(true)} />
          <canvas ref={reffy} width={`${squareSize}px`} height='14px' style={{ position: 'relative', borderRadius: 14 }} onClick={(e) => handleClick(e)} />
        </div>
      </div>
    </div>
  )
}
