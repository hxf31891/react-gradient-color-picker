import React, { useState } from 'react'
import { SlidersIcon, InputsIcon, PaletteIcon } from './icon.js'
import { usePicker } from '../context.js'
import EyeDropper from './EyeDropper.js'
import { config } from '../constants.js'
import AdvancedControls from './AdvancedControls.js'
import ComparibleColors from './ComparibleColors.js'
import GradientControls from './GradientControls.js'
import { LocalesProps } from '../shared/types.js'

var { defaultColor, defaultGradient } = config

const Controls = ({
  locales,
  hideEyeDrop,
  hideAdvancedSliders,
  hideColorGuide,
  hideInputType,
  hideColorTypeBtns,
  hideGradientControls,
  hideGradientType,
  hideGradientAngle,
  hideGradientStop,
}: {
  locales?: LocalesProps
  hideEyeDrop?: boolean
  hideAdvancedSliders?: boolean
  hideColorGuide?: boolean
  hideInputType?: boolean
  hideColorTypeBtns?: boolean
  hideGradientControls?: boolean
  hideGradientType?: boolean
  hideGradientAngle?: boolean
  hideGradientStop?: boolean
}) => {
  const { onChange, isGradient, handleChange, classes, previous } = usePicker()
  const [openComparibles, setOpenComparibles] = useState(false)
  const [openInputType, setOpenInputType] = useState(false)
  const [openAdvanced, setOpenAdvanced] = useState(false)

  const noTools =
    hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType

  const solidColor = previous?.color || defaultColor
  const gradientColor = previous?.gradient || defaultGradient

  const setSolid = () => {
    onChange(solidColor)
  }

  const setGradient = () => {
    onChange(gradientColor)
  }

  const allRightControlsHidden =
    hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType
  const allControlsHidden = allRightControlsHidden && hideColorTypeBtns

  if (allControlsHidden) {
    if (isGradient && !hideGradientControls) {
      return (
        <GradientControls
          hideGradientType={hideGradientType}
          hideGradientAngle={hideGradientAngle}
          hideGradientStop={hideGradientStop}
        />
      )
    } else {
      return null
    }
  } else {
    return (
      <div style={{ paddingTop: 12, paddingBottom: 4 }}>
        <div
          style={{ width: '100%' }}
          className={`${classes.ac} ${classes.jsb}`}
        >
          <ColorTypeBtns
            hideColorTypeBtns={hideColorTypeBtns}
            setGradient={setGradient}
            isGradient={isGradient}
            setSolid={setSolid}
            locales={locales}
          />

          {!allRightControlsHidden && (
            <div
              style={{ display: noTools ? 'none' : '' }}
              className={classes.rbgcpControlBtnWrapper}
            >
              {!hideEyeDrop && <EyeDropper onSelect={handleChange} />}
              <div
                id="rbgcp-advanced-btn"
                onClick={() => setOpenAdvanced(!openAdvanced)}
                className={controlBtnStyles(openAdvanced, classes)}
                style={{ display: hideAdvancedSliders ? 'none' : 'flex' }}
              >
                <SlidersIcon color={openAdvanced ? '#568CF5' : ''} />
              </div>
              <div
                id="rbgcp-comparibles-btn"
                style={{ display: hideColorGuide ? 'none' : 'flex' }}
                onClick={() => setOpenComparibles(!openComparibles)}
                className={controlBtnStyles(openComparibles, classes)}
              >
                <PaletteIcon color={openComparibles ? '#568CF5' : ''} />
              </div>
              <div
                id="rbgcp-color-model-btn"
                onClick={() => setOpenInputType(!openInputType)}
                className={controlBtnStyles(openInputType, classes)}
                style={{ display: hideInputType ? 'none' : 'flex' }}
              >
                <InputsIcon color={openInputType ? '#568CF5' : ''} />
                <InputTypeDropdown
                  openInputType={openInputType}
                  setOpenInputType={setOpenInputType}
                />
              </div>
            </div>
          )}
        </div>
        {!hideAdvancedSliders && (
          <AdvancedControls openAdvanced={openAdvanced} />
        )}
        {!hideColorGuide && (
          <ComparibleColors openComparibles={openComparibles} />
        )}
        {isGradient && !hideGradientControls && (
          <GradientControls
            hideGradientType={hideGradientType}
            hideGradientAngle={hideGradientAngle}
            hideGradientStop={hideGradientStop}
          />
        )}
      </div>
    )
  }
}

export default Controls

const InputTypeDropdown = ({
  openInputType,
  setOpenInputType,
}: {
  openInputType?: boolean
  setOpenInputType: (arg0: boolean) => void
}) => {
  const { inputType, setInputType, classes } = usePicker()
  const vTrans = openInputType
    ? 'visibility 0ms linear'
    : 'visibility 100ms linear 150ms'
  const zTrans = openInputType
    ? 'z-index 0ms linear'
    : 'z-index 100ms linear 150ms'
  const oTrans = openInputType
    ? 'opacity 120ms linear'
    : 'opacity 150ms linear 50ms'

  const handleInputType = (e: any, val: string) => {
    if (openInputType) {
      e.stopPropagation()
      setInputType(val)
      setOpenInputType(false)
    }
  }

  return (
    <div
      style={{
        visibility: openInputType ? 'visible' : 'hidden',
        zIndex: openInputType ? '' : -100,
        opacity: openInputType ? 1 : 0,
        transition: `${oTrans}, ${vTrans}, ${zTrans}`,
      }}
      className={classes.rbgcpColorModelDropdown}
    >
      <div
        onClick={(e) => handleInputType(e, 'rgb')}
        className={modalBtnStyles(inputType === 'rgb', classes)}
      >
        RGB
      </div>
      <div
        onClick={(e) => handleInputType(e, 'hsl')}
        className={modalBtnStyles(inputType === 'hsl', classes)}
      >
        HSL
      </div>
      <div
        onClick={(e) => handleInputType(e, 'hsv')}
        className={modalBtnStyles(inputType === 'hsv', classes)}
      >
        HSV
      </div>
      <div
        onClick={(e) => handleInputType(e, 'cmyk')}
        className={modalBtnStyles(inputType === 'cmyk', classes)}
      >
        CMYK
      </div>
    </div>
  )
}

const ColorTypeBtns = ({
  hideColorTypeBtns,
  isGradient,
  setSolid,
  setGradient,
  locales,
}: {
  hideColorTypeBtns?: boolean
  isGradient?: boolean
  setSolid: () => void
  setGradient: () => void
  locales?: LocalesProps
}) => {
  const { classes } = usePicker()

  if (hideColorTypeBtns) {
    return <div style={{ width: 1 }} />
  } else {
    return (
      <div className={classes.rbgcpControlBtnWrapper}>
        <div
          onClick={setSolid}
          id="rbgcp-solid-btn"
          className={colorTypeBtnStyles(!isGradient, classes)}
        >
          {locales?.CONTROLS?.SOLID}
        </div>
        <div
          onClick={setGradient}
          id="rbgcp-gradient-btn"
          className={colorTypeBtnStyles(isGradient || false, classes)}
        >
          {locales?.CONTROLS?.GRADIENT}
        </div>
      </div>
    )
  }
}

export const colorTypeBtnStyles = (selected: boolean, classes: any) => {
  if (selected) {
    return `${classes.rbgcpControlBtn} ${classes.rbgcpControlBtnSelected}`
  } else {
    return classes.rbgcpControlBtn
  }
}

export const controlBtnStyles = (selected: boolean, classes: any) => {
  if (selected) {
    return `${classes.rbgcpControlIconBtn} ${classes.rbgcpControlBtnSelected}`
  } else {
    return classes.rbgcpControlIconBtn
  }
}

export const modalBtnStyles = (selected: boolean, classes: any) => {
  if (selected) {
    return `${classes.rbgcpControlBtn} ${classes.rbgcpColorModelDropdownBtn} ${classes.rbgcpControlBtnSelected}`
  } else {
    return `${classes.rbgcpControlBtn} ${classes.rbgcpColorModelDropdownBtn}`
  }
}
