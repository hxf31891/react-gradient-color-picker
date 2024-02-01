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
import { low, high } from '../utils/formatters.js'

const GradientType = () => {
  const { gradientType, onChange, value, classes } = usePicker()
  const isLinear = gradientType === 'linear-gradient'
  const isRadial = gradientType === 'radial-gradient'

  const handleLinear = () => {
    const remaining = value.split(/,(.+)/)[1]
    onChange(`linear-gradient(90deg, ${remaining}`)
  }

  const handleRadial = () => {
    const remaining = value.split(/,(.+)/)[1]
    onChange(`radial-gradient(circle, ${remaining}`)
  }

  return (
    <div className={classes.rbgcpControlBtnWrapper}>
      <div
        onClick={handleLinear}
        id="rbgcp-linear-btn"
        className={`${classes.rbgcpControlBtn} ${isLinear && classes.rbgcpControlBtnSelected}`}
      >
        <LinearIcon color={isLinear ? '#568CF5' : ''} />
      </div>
      <div
        onClick={handleRadial}
        id="rbgcp-radial-btn"
        className={`${classes.rbgcpControlBtn} ${isRadial && classes.rbgcpControlBtnSelected}`}
      >
        <RadialIcon color={isRadial ? '#568CF5' : ''} />
      </div>
    </div>
  )
}

const StopPicker = () => {
  const { classes, currentLeft, handleGradient, currentColor } = usePicker()

  const handleMove = (newVal: string) => {
    handleGradient(currentColor, formatInputValues(parseInt(newVal), 0, 100))
  }

  return (
    <div
      className={`${classes.rbgcpControlBtnWrapper} ${classes.rbgcpControlInputWrap} ${classes.rbgcpStopInputWrap}`}
      style={{ paddingLeft: 8 }}
    >
      <StopIcon />
      <input
        value={currentLeft}
        id="rbgcp-stop-input"
        onChange={(e) => handleMove(e.target.value)}
        className={`${classes.rbgcpControlInput} ${classes.rbgcpStopInput}`}
      />
    </div>
  )
}

const DegreePicker = () => {
  const { classes, degrees, onChange, value } = usePicker()

  const handleDegrees = (e: any) => {
    const newValue = formatInputValues(e.target.value, 0, 360)
    const remaining = value.split(/,(.+)/)[1]
    onChange(`linear-gradient(${newValue || 0}deg, ${remaining}`)
  }

  return (
    <div
      className={`${classes.rbgcpControlBtnWrapper} ${classes.rbgcpControlInputWrap} ${classes.rbgcpDegreeInputWrap}`}
    >
      <DegreesIcon />
      <input
        value={degrees}
        id="rbgcp-degree-input"
        onChange={(e) => handleDegrees(e)}
        className={`${classes.rbgcpControlInput} ${classes.rbgcpDegreeInput}`}
      />
      <div
        style={{
          position: 'absolute',
          right: degrees > 99 ? 0 : degrees < 10 ? 7 : 3,
          top: 1,
          fontWeight: 400,
          fontSize: 13,
        }}
        className={classes.rbgcpDegreeIcon}
      >
        °
      </div>
    </div>
  )
}

const DeleteBtn = () => {
  const { colors, classes, selectedColor, createGradientStr } = usePicker()

  const deletePoint = () => {
    if (colors?.length > 2) {
      const formatted = colors?.map((fc: any, i: number) => ({
        ...fc,
        value: i === selectedColor - 1 ? high(fc) : low(fc),
      }))
      const remaining = formatted?.filter(
        (_: any, i: number) => i !== selectedColor
      )
      createGradientStr(remaining)
    }
  }

  return (
    <div
      onClick={deletePoint}
      style={{ width: 28 }}
      id="rbgcp-point-delete-btn"
      className={controlBtnStyles(false, classes)}
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
  const { gradientType, classes } = usePicker()
  return (
    <div
      style={{
        marginTop: 12,
        marginBottom: -4,
        justifyContent: 'space-between',
        paddingLeft: hideGradientType ? 4 : 0,
      }}
      id="rbgcp-gradient-controls-wrap"
      className={classes.rbgcpControlBtnWrapper}
    >
      {!hideGradientType && <GradientType />}
      <div style={{ width: 53 }}>
        {!hideGradientAngle && gradientType === 'linear-gradient' && (
          <DegreePicker />
        )}
      </div>
      {!hideGradientStop && <StopPicker />}
      <DeleteBtn />
    </div>
  )
}

export default GradientControls
