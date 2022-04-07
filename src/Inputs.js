import React, { useState, useEffect } from 'react'
import { formatInputValues, rgbInputSwitch } from './utils'
import { usePicker } from './context'
var convert = require('color-convert');

const Inputs = () => {
  const [disable, setDisable] = useState('')
  const { handleChange, tinyColor } = usePicker()
  const { r, g, b, a } = tinyColor.toRgb();
  const hex = tinyColor.toHex();
  const [newHex, setNewHex] = useState(hex)

  useEffect(() => {
    if (disable !== 'hex') {
      setNewHex(hex)
    }
  }, [tinyColor])

  const handleHex = e => {
    let newRgba = convert.hex.rgb(e.target.value);
    setNewHex(e.target.value);
    let newColor = `rgba(${newRgba[0]}, ${newRgba[1]}, ${newRgba[2]}, ${a})`;
    handleChange(newColor);
  }

  const handleRgb = (value, type) => {
    let formatted = formatInputValues(value, 0, 255);
    let newValue = rgbInputSwitch(type, formatted, r, g, b, a);
    handleChange(newValue);
  }

  const handleO = (value) => {
    let formatted = formatInputValues(value, 0, 1);
    handleChange(`rgba(${r}, ${g}, ${b}, ${formatted})`);
  }

  return(
    <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: 24}}>
      <div style={{width: 74}}>
        <input className='input-wrap' value={newHex} onChange={(e) => handleHex(e)} onFocus={() => setDisable('hex')} onBlur={() => setDisable('')}/>
        <div className='input-label'>HEX</div>
      </div>
      <div style={{width: 44}}>
        <input className='input-wrap' value={r} onChange={(e) => handleRgb(parseFloat(e.target.value), 'r')} />
        <div className='input-label'>R</div>
      </div>
      <div style={{width: 44}}>
        <input className='input-wrap' value={g} onChange={(e) => handleRgb(parseFloat(e.target.value), 'g')} />
        <div className='input-label'>G</div>
      </div>
      <div style={{width: 44}}>
        <input className='input-wrap' value={b} onChange={(e) => handleRgb(parseFloat(e.target.value), 'b')}/>
        <div className='input-label'>B</div>
      </div>
      <div style={{width: 44}}>
        <input className='input-wrap' value={a} onChange={(e) => handleO(parseFloat(e.target.value))} />
        <div className='input-label'>A</div>
      </div>
    </div>
  )
}

export default Inputs;
