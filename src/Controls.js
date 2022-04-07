import React from 'react'
import TrashIcon, { LinearIcon, RadialIcon, MenuIcon } from './icon'
import { usePicker } from './context'

const Controls = () => {
  const { isGradient, onChange, gradientType, setSelectedColor, colors } = usePicker()
  const isLinear = gradientType === 'linear-gradient'

  const setSolid = () => {
    setSelectedColor(0)
    onChange('rgba(175, 51, 242, 1)')
  }

  const setGradient = () => {
    onChange('linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)')
  }

  return(
    <div style={{paddingTop: 12, paddingBottom: 9, overflow: 'hidden'}} className='df jsb'>
      <div  className='df jsb ac' style={{width: '100%'}}>
        <div className='df jc ac' style={{height: 28, background: '#e9e9f5', borderRadius: 6, padding: 2}}>
          <div style={controlBtnStyles(!isGradient)} className='control-btn df ac' onClick={setSolid}>Solid</div>
          <div style={controlBtnStyles(isGradient)} className='control-btn df ac' onClick={setGradient}>Gradient</div>
        </div>
        <div className='df ac jfe' style={{height: 28, background: '#e9e9f5', borderRadius: 6, padding: 2}}>
          {(isLinear && isGradient) && <DegreePicker />}
          {isGradient && <GradientType />}
          {(isGradient && colors.length > 2) && <DeleteBtn />}
          <div style={{width: 24}} className='df jc'>
            <MenuIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Controls

const GradientType = () => {
  const { gradientType, onChange, value } = usePicker()

  const handleLinear = () => {
    const remaining = value.split(/,(.+)/)[1]
    onChange(`linear-gradient(90deg, ${remaining}`)
  }

  const handleRadial = () => {
    const remaining = value.split(/,(.+)/)[1]
    onChange(`radial-gradient(circle, ${remaining}`)
  }

  return(
    <div className='df ac' style={{marginRight: 11}}>
      <div className='control-grad-wrap' onClick={handleLinear} style={{marginRight: 1, ...gradBtnStyles(gradientType==='linear-gradient')}}>
        <LinearIcon />
      </div>
      <div className='control-grad-wrap' onClick={handleRadial} style={{marginLeft: 1, ...gradBtnStyles(gradientType==='radial-gradient')}}>
        <RadialIcon />
      </div>
    </div>
  )
}

const DegreePicker = () => {
  const { degrees, value, onChange } = usePicker()

  const handleDegrees = (e) => {
    let num = parseInt(e.target.value)
    let nans = isNaN(num) ? 0 : num
    let min = Math.max(nans, 0)
    let max = Math.min(min, 360)
    const remaining = value.split(/,(.+)/)[1]
    onChange(`linear-gradient(${max}deg, ${remaining}`)
  }

  return(
    <div className='ps-rl' style={{marginRight: 14}}>
      <input className='degree-input' value={degrees} onChange={(e) => handleDegrees(e)}/>
      <div style={{position: 'absolute', right: degrees > 99 ? 0 : 3, top: -1, fontWeight: 400, fontSize: 13}}>°</div>
    </div>
  )
}

const DeleteBtn = () => {
  const { deletePoint } = usePicker();

  return(
    <div onClick={deletePoint} className='delete-point-btn df jc ac'>
      <TrashIcon />
    </div>
  )
}

const gradBtnStyles = (selected) => {
  return{
    background: selected ? 'white' : '',
    boxShadow: selected ? '1px 1px 6px rgba(0,0,0,.15)' : ''
  }
}

const controlBtnStyles = (selected) => {
  return{
    background: selected ? 'white' : '',
    color: selected ? '#568CF5' : '',
    boxShadow: selected ? '0px 0px 8px rgba(0,0,0,.125)' : ''
  }
}
