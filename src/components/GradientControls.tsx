import React from 'react'
import { usePicker } from '../context.js'
import { formatInputValues } from '../utils/formatters.js'
import { controlBtnStyles } from './Controls.js'
import TrashIcon, {
  LinearIcon,
  RadialIcon,
  DegreesIcon,
  StopIcon,
} from './icon.js'

const GradientType = () => {
  const { gradientType, internalOnChange, value } = usePicker()
  const isLinear = gradientType === 'linear-gradient'
  const isRadial = gradientType === 'radial-gradient'

  const handleLinear = () => {
    const remaining = value.split(/,(.+)/)[1]
    internalOnChange(`linear-gradient(90deg, ${remaining}`)
  }

  const handleRadial = () => {
    const remaining = value.split(/,(.+)/)[1]
    internalOnChange(`radial-gradient(circle, ${remaining}`)
  }

  return (
    <div className="rbgcp-control-btn-wrapper">
      <div
        onClick={handleLinear}
        id="rbgcp-linear-btn"
        className={`rbgcp-control-btn rbgcp-linear-btn ${
          isLinear && 'rbgcp-control-btn-selected'
        }`}
      >
        <LinearIcon color={isLinear ? '#568CF5' : ''} />
      </div>
      <div
        onClick={handleRadial}
        id="rbgcp-gradient-btn"
        className={`rbgcp-control-btn rbgcp-gradient-btn ${
          isRadial && 'rbgcp-control-btn-selected'
        }`}
      >
        <RadialIcon color={isRadial ? '#568CF5' : ''} />
      </div>
    </div>
  )
}

const StopPicker = () => {
  const { currentLeft, handleGradient, currentColor } = usePicker()

  const handleMove = (newVal: string) => {
    handleGradient(currentColor, formatInputValues(parseInt(newVal), 0, 100))
  }

  return (
    <div
      className="rbgcp-control-btn-wrapper rbgcp-control-input-wrap rbgcp-stop-input-wrap"
      style={{ paddingLeft: 8 }}
    >
      <StopIcon />
      <input
        id="rbgcp-stop-input"
        value={currentLeft}
        className="rbgcp-control-input rbgcp-stop-input"
        onChange={(e) => handleMove(e.target.value)}
      />
    </div>
  )
}

const DegreePicker = () => {
  const { degrees, internalOnChange, value } = usePicker()

  const handleDegrees = (e: any) => {
    const newValue = formatInputValues(e.target.value, 0, 360)
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

const DeconsteBtn = () => {
  const { deletePoint } = usePicker()

  return (
    <div
      onClick={deletePoint}
      style={{ width: 28, ...controlBtnStyles(false) }}
      id="rbgcp-point-deconste-btn"
      className="rbgcp-control-icon-btn rbgcp-point-deconste-btn"
    >
      <TrashIcon />
    </div>
  )
}

const GradientControls = ({
  hideGradientType,
  hideGradientAngle,
  hideGradientStop,
}: {
  hideGradientType?: boolean
  hideGradientAngle?: boolean
  hideGradientStop?: boolean
}) => {
  const { gradientType } = usePicker()
  return (
    <div
      style={{
        marginTop: 12,
        marginBottom: -4,
        paddingLeft: hideGradientType ? 4 : 0,
      }}
      id="rbgcp-gradient-controls-wrap"
      className="rbgcp-control-btn-wrapper jsb"
    >
      {!hideGradientType && <GradientType />}
      <div style={{ width: 53 }}>
        {!hideGradientAngle && gradientType === 'linear-gradient' && (
          <DegreePicker />
        )}
      </div>
      {!hideGradientStop && <StopPicker />}
      <DeconsteBtn />
    </div>
  )
}

export default GradientControls
