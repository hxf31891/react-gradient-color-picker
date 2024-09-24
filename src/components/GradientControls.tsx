import React from 'react'
import { usePicker } from '../context.js'
import { formatInputValues, low, high } from '../utils/formatters.js'
import { controlBtnStyles } from '../styles/styles.js'
import TrashIcon, {
  LinearIcon,
  RadialIcon,
  DegreesIcon,
  StopIcon,
} from './icon.js'

const GradientType = () => {
  const { gradientType, onChange, value, componentStyles } = usePicker()
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
    <div style={componentStyles.ControlBtnWrapper}>
      <div
        onClick={handleLinear}
        id="rbgcp-linear-btn"
        style={{
          ...componentStyles.ControlBtn,
          ...(isLinear && componentStyles.ControlBtnSelected),
        }}
        tabIndex={0}
        role="button"
        onKeyDown={() => {
          return
        }}
      >
        <LinearIcon color={isLinear ? '#568CF5' : ''} />
      </div>
      <div
        onClick={handleRadial}
        id="rbgcp-radial-btn"
        style={{
          ...componentStyles.ControlBtn,
          ...(isRadial && componentStyles.ControlBtnSelected),
        }}
        tabIndex={0}
        role="button"
        onKeyDown={() => {
          return
        }}
      >
        <RadialIcon color={isRadial ? '#568CF5' : ''} />
      </div>
    </div>
  )
}

const StopPicker = () => {
  const { currentLeft, handleGradient, currentColor, componentStyles } =
    usePicker()

  const handleMove = (newVal: string) => {
    handleGradient(currentColor, formatInputValues(parseInt(newVal), 0, 100))
  }

  return (
    <div
      style={{
        ...componentStyles.ControlBtnWrapper,
        ...componentStyles.ControlInputWrap,
        ...componentStyles.StopInputWrap,
        paddingLeft: 8,
      }}
    >
      <StopIcon />
      <input
        value={currentLeft}
        id="rbgcp-stop-input"
        onChange={(e) => handleMove(e.target.value)}
        style={{
          ...componentStyles.ControlInput,
          ...componentStyles.topInput,
        }}
      />
    </div>
  )
}

const DegreePicker = () => {
  const { degrees, onChange, value, componentStyles } = usePicker()

  const handleDegrees = (e: any) => {
    const newValue = formatInputValues(e.target.value, 0, 360)
    const remaining = value.split(/,(.+)/)[1]
    onChange(`linear-gradient(${newValue || 0}deg, ${remaining}`)
  }

  return (
    <div
      style={{
        ...componentStyles.ControlBtnWrapper,
        ...componentStyles.ControlInputWrap,
        ...componentStyles.DegreeInputWrap,
      }}
    >
      <DegreesIcon />
      <input
        value={degrees}
        id="rbgcp-degree-input"
        onChange={(e) => handleDegrees(e)}
        style={{
          ...componentStyles.ControlInput,
          ...componentStyles.DegreeInput,
        }}
      />
      <div
        style={{
          ...componentStyles.DegreeIcon,
          position: 'absolute',
          right: degrees > 99 ? 0 : degrees < 10 ? 7 : 3,
          top: 1,
          fontWeight: 400,
          fontSize: 13,
        }}
      >
        °
      </div>
    </div>
  )
}

const DeleteBtn = () => {
  const { colors, selectedColor, createGradientStr, componentStyles } =
    usePicker()

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
      style={{ ...controlBtnStyles(false, componentStyles), width: 28 }}
      id="rbgcp-point-delete-btn"
      tabIndex={0}
      role="button"
      onKeyDown={() => {
        return
      }}
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
  const { gradientType, componentStyles } = usePicker()
  return (
    <div
      style={{
        ...componentStyles.ControlBtnWrapper,
        marginTop: 12,
        marginBottom: -4,
        justifyContent: 'space-between',
        paddingLeft: hideGradientType ? 4 : 0,
      }}
      id="rbgcp-gradient-controls-wrap"
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
