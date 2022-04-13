import React from 'react'
import { usePicker } from './context'
import { formatInputValues } from './formatters'
import { controlBtnStyles } from './Controls'
import TrashIcon, { LinearIcon, RadialIcon, DegreesIcon, StopIcon } from './icon'

const GradientControls = () => {
  const { gradientType } = usePicker()
  return(
    <div className='df jsb' style={{marginTop: 12, marginBottom: -4, background: '#e9e9f5', borderRadius: 6}}>
      <GradientType />
      <div style={{width: 53}}>
        {gradientType === 'linear-gradient' && <DegreePicker />}
      </div>
      <StopPicker />
      <DeleteBtn />
    </div>
  )
}

export default GradientControls;

const GradientType = () => {
  const { gradientType, onChange, value } = usePicker();
  let isLinear = gradientType==='linear-gradient';
  let isRadial = gradientType==='radial-gradient'

  const handleLinear = () => {
    const remaining = value.split(/,(.+)/)[1]
    onChange(`linear-gradient(90deg, ${remaining}`)
  }

  const handleRadial = () => {
    const remaining = value.split(/,(.+)/)[1]
    onChange(`radial-gradient(circle, ${remaining}`)
  }

  return(
    <div className='df ac control-btns-wrap'>
      <div className='control-btn' onClick={handleLinear} style={{...controlBtnStyles(isLinear)}}>
        <LinearIcon color={isLinear ? '#568CF5' : ''} />
      </div>
      <div className='control-btn' onClick={handleRadial} style={{...controlBtnStyles(isRadial)}}>
        <RadialIcon color={isRadial ? '#568CF5' : ''} />
      </div>
    </div>
  )
}

const StopPicker = () => {
  const { currentLeft, handleGradient, currentColor } = usePicker()

  const handleMove = (newVal) => {
    handleGradient(currentColor, formatInputValues(newVal, 0, 100))
  }

  return(
    <div className='df ac control-btns-wrap' style={{paddingLeft: 8}}>
      <StopIcon />
      <input className='degree-input' value={currentLeft} onChange={(e) => handleMove(e.target.value)}/>
    </div>
  )
}

const DegreePicker = () => {
  const { degrees, onChange, value } = usePicker()

  const handleDegrees = (e) => {
    let newValue = formatInputValues(e.target.value, 0, 360)
    const remaining = value.split(/,(.+)/)[1]
    onChange(`linear-gradient(${newValue || 0}deg, ${remaining}`)
  }

  return(
    <div className='ps-rl control-btns-wrap df ac'>
      <DegreesIcon />
      <input className='degree-input' value={degrees} onChange={(e) => handleDegrees(e)}/>
      <div style={{position: 'absolute', right: degrees > 99 ? 0 : degrees < 10 ? 7 : 3, top: 1, fontWeight: 400, fontSize: 13}}>°</div>
    </div>
  )
}

const DeleteBtn = () => {
  const { deletePoint } = usePicker();

  return(
    <div onClick={deletePoint} className='df jc ac control-btns-wrap' style={{width: 30, ...controlBtnStyles(false), marginRight: 1}}>
      <TrashIcon />
    </div>
  )
}
