import React from 'react'
import { usePicker } from './context'
import GradientBar from './GradientBar'

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
    <div style={{paddingTop: 12, paddingBottom: 2}} className='df jsb'>
      <div style={{width: "25%"}}>
        {isGradient && <GradientType />}
      </div>
      <div className='control-btn-wrap df'>
        <div style={controlBtnStyles(!isGradient)} className='control-btn df ac' onClick={setSolid}>Solid</div>
        <div style={controlBtnStyles(isGradient)} className='control-btn df ac' onClick={setGradient}>Gradient</div>
      </div>
      <div style={{width: "25%"}} className='df jfe ac'>
        {(isGradient && colors.length > 2) && <DeleteBtn />}
        {(isLinear && isGradient) && <DegreePicker />}
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
    <div className='control-grad-type df'>
      <div className='control-grad-btn-wrap' style={{boxShadow: gradientType === 'linear-gradient' ? '0px 0px 2px 1px #568CF5' : '0px 0px 1px 1px #8c8c8f'}}>
        <div className='control-grad-btn control-grad-1' onClick={handleLinear} />
      </div>
      <div className='control-grad-btn-wrap' style={{boxShadow: gradientType === 'radial-gradient' ? '0px 0px 2px 1px #568CF5' : '0px 0px 1px 1px #8c8c8f'}}>
        <div className='control-grad-btn control-grad-2' onClick={handleRadial} />
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
    <div style={{position: 'relative', display: 'flex', justifyContent: 'flex-end'}}>
      <input className='input-wrap' style={{marginLeft: 8, width: 44}} value={degrees} onChange={(e) => handleDegrees(e)}/>
      <div style={{position: 'absolute', right: 4, top: 0, fontWeight: 400}}>°</div>
    </div>
  )
}

const DeleteBtn = () => {
  const { deletePoint } = usePicker();

  return(
    <div onClick={deletePoint} className='delete-point-btn df jc ac'>
      <i className='bi-trash' style={{fontSize: 15}} />
    </div>
  )
}

const controlBtnStyles = (selected) => {
  return{
    background: selected ? '#568CF5' : 'white',
    color: selected ? 'white' : ''
  }
}
