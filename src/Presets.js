import React from 'react'
import { usePicker } from './context'

const Presets = ({ presets = [] }) => {
  const { value, handleChange } = usePicker();

  const getPresets = () => {
    if (presets?.length > 0) {
      return presets?.slice(0, 18)
    } else {
      return fakePresets
    }
  }

  return(
    <div style={{display: 'flex', marginTop: 20}}>
      <div style={{width: 50, height: 50, background: value, borderRadius: 6, flexShrink: 0}}/>
      <div style={{display: 'flex', flexWrap: 'wrap', marginLeft: 16}}>
      {getPresets().map((p, key) => (<div key={key} style={{height: 23, width: 23, borderRadius: 4, background: p, marginLeft: 2, marginBottom: 2, border: p === 'rgba(255,255,255, 1)' ? '1px solid #96959c' : ''}} onClick={() => handleChange(p)}/>))}
      </div>
    </div>
  )
}

export default Presets

const fakePresets = [
  'rgba(0,0,0,1)',
  'rgba(128,128,128, 1)',
  'rgba(192,192,192, 1)',
  'rgba(255,255,255, 1)',
  'rgba(0,0,128,1)',
  'rgba(0,0,255,1)',
  'rgba(0,255,255, 1)',
  'rgba(0,128,0,1)',
  'rgba(128,128,0, 1)',
  'rgba(0,128,128,1)',
  'rgba(0,255,0, 1)',
  'rgba(128,0,0, 1)',
  'rgba(128,0,128, 1)',
  'rgba(175, 51, 242, 1)',
  'rgba(255,0,255, 1)',
  'rgba(255,0,0, 1)',
  'rgba(240, 103, 46, 1)',
  'rgba(255,255,0, 1)',
]
