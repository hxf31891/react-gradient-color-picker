import React from 'react'
import { usePicker } from '../context'
import { formatInputValues } from '../utils/formatters'
import { controlBtnStyles } from './Controls'
import TrashIcon, {
  LinearIcon,
  RadialIcon,
  DegreesIcon,
  StopIcon,
} from './icon';

const GradientControls = ({hideGradientType, hideGradientAngle, hideGradientStop}) => {
  const { gradientType } = usePicker()
  return (
    <div
      style={{
        marginTop: 12,
        marginBottom: -4,
        paddingLeft: hideGradientType ? 4 : 0
      }}
      id="rbgcp-gradient-controls-wrap"
      className="rbgcp-control-btn-wrapper jsb"
    >
      {!hideGradientType && <GradientType />}
      <div style={{ width: 53 }}>
        {(!hideGradientAngle && gradientType === 'linear-gradient') && (
          <DegreePicker />
        )}
      </div>
      {!hideGradientStop && <StopPicker />}
      <DeleteBtn />
    </div>
  )
}

export default GradientControls

const GradientType = () => {
  const { gradientType, internalOnChange, value } = usePicker()
  let isLinear = gradientType === 'linear-gradient'
  let isRadial = gradientType === 'radial-gradient'

  const handleLinear = () => {
    const remaining = value.split(/,(.+)/)[1]
    internalOnChange(`linear-gradient(90deg, ${remaining}`)
  }

  const handleRadial = () => {
    const remaining = value.split(/,(.+)/)[1]
    internalOnChange(`radial-gradient(circle, ${remaining}`)
  }

  return (
    <div className='rbgcp-control-btn-wrapper'>
      <div
        onClick={handleLinear}
        id="rbgcp-linear-btn"
        className={`rbgcp-control-btn rbgcp-linear-btn ${isLinear && "rbgcp-control-btn-selected"}`}
      >
        <LinearIcon color={isLinear ? '#568CF5' : ''} />
      </div>
      <div
        onClick={handleRadial}
        id="rbgcp-gradient-btn"
        className={`rbgcp-control-btn rbgcp-gradient-btn ${isRadial && "rbgcp-control-btn-selected"}`}
      >
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

  return (
    <div className="rbgcp-control-btn-wrapper rbgcp-control-input-wrap rbgcp-stop-input-wrap" style={{ paddingLeft: 8 }}>
      <StopIcon />
      <input
        id="rbgcp-stop-input"
        value={currentLeft}
        className="rbgcp-control-input rbgcp-stop-input"
        onChange={(e) => handleMove(e.target.value || 0)}
      />
    </div>
  )
}

const DegreePicker = () => {
  const { degrees, internalOnChange, value } = usePicker()

  const handleDegrees = (e) => {
    let newValue = formatInputValues(e.target.value, 0, 360)
    const remaining = value.split(/,(.+)/)[1]
    internalOnChange(`linear-gradient(${newValue || 0}deg, ${remaining}`)
  }

  return (
    <div className="rbgcp-control-btn-wrapper rbgcp-control-input-wrap rbgcp-degree-input-wrap">
      <DegreesIcon />
      <input
        id="rbgcp-degree-input"
        value={degrees}
        className="rbgcp-control-input rbgcp-degree-input"
        onChange={(e) => handleDegrees(e)}
      />
      <div
        style={{
          position: 'absolute',
          right: degrees > 99 ? 0 : degrees < 10 ? 7 : 3,
          top: 1,
          fontWeight: 400,
          fontSize: 13,
        }}
        className="rbgcp-degree-icon"
      >
        °
      </div>
    </div>
  )
}

const DeleteBtn = () => {
  const { deletePoint } = usePicker()

  return (
    <div
      onClick={deletePoint}
      style={{ width: 28, ...controlBtnStyles(false)}}
      id="rbgcp-point-delete-btn"
      className="rbgcp-control-icon-btn rbgcp-point-delete-btn"
    >
      <TrashIcon />
    </div>
  )
}
