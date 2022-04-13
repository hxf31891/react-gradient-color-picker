import React from 'react'
import { usePicker } from './context'

const ComparibleColors = ({ openComparibles }) => {
  const { tinyColor, handleChange } = usePicker();

  const analogous = tinyColor.analogous()
  const monochromatic = tinyColor.monochromatic()
  const triad = tinyColor.triad()
  const tetrad = tinyColor.tetrad()

  const handleClick = (tiny) => {
    let { r, g, b, a} = tiny.toRgb()
    handleChange(`rgba(${r},${g},${b},${a})`)
  }

  return(
    <div style={{height: openComparibles ? 216 : 0, width: '100%', transition: 'all 120ms linear'}}>
      <div style={{paddingTop: 11, display: openComparibles ? '' : 'none'}} className='ps-rl'>
        <div style={{textAlign: 'center', color: '#323136', fontSize: 13, fontWeight: 600, position: 'absolute', top: 6.5, left: 2}}>Color Guide</div>
        <div style={{textAlign: 'center', color: '#323136', fontSize: 12, fontWeight: 500, marginTop: 3}}>Analogous</div>
        <div className='df' style={{borderRadius: 5, overflow: 'hidden'}}>{analogous?.map((c, key) => (<div key={key} style={{width: '20%', height: 30, background: c.toHexString()}} onClick={() => handleClick(c)} />))}</div>
        <div style={{textAlign: 'center', color: '#323136', fontSize: 12, fontWeight: 500, marginTop: 3}}>Monochromatic</div>
        <div className='df jfe' style={{borderRadius: 5, overflow: 'hidden'}}>{monochromatic?.map((c, key) => (<div key={key} style={{width: '20%', height: 30, background: c.toHexString()}} onClick={() => handleClick(c)} />))}</div>
        <div style={{textAlign: 'center', color: '#323136', fontSize: 12, fontWeight: 500, marginTop: 3}}>Triad</div>
        <div className='df jfe' style={{borderRadius: 5, overflow: 'hidden'}}>{triad?.map((c, key) => (<div key={key} style={{width: 'calc(100% / 3)', height: 28, background: c.toHexString()}} onClick={() => handleClick(c)} />))}</div>
        <div style={{textAlign: 'center', color: '#323136', fontSize: 12, fontWeight: 500, marginTop: 3}}>Tetrad</div>
        <div className='df jfe' style={{borderRadius: 5, overflow: 'hidden'}}>{tetrad?.map((c, key) => (<div key={key} style={{width: '25%', height: 28, background: c.toHexString()}} onClick={() => handleClick(c)} />))}</div>
      </div>
    </div>
  )
}

export default ComparibleColors;
