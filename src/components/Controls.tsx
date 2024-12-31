/* eslint-disable react/jsx-no-leaked-render */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import { SlidersIcon, InputsIcon, PaletteIcon } from './icon.js'
import { usePicker } from '../context.js'
import EyeDropper from './EyeDropper.js'
import AdvancedControls from './AdvancedControls.js'
import ComparibleColors from './ComparibleColors.js'
import GradientControls from './GradientControls.js'
import { LocalesProps } from '../shared/types.js'
import { colorTypeBtnStyles, controlBtnStyles, modalBtnStyles } from '../styles/styles.js'

const ColorTypeBtns = ({
  hideColorTypeBtns,
  setGradient,
  isGradient,
  setSolid,
  locales,
}: {
  hideColorTypeBtns?: boolean
  isGradient?: boolean
  setSolid: () => void
  setGradient: () => void
  locales?: LocalesProps
}) => {
  const { defaultStyles, pickerIdSuffix } = usePicker()

  if (hideColorTypeBtns) {
    return <div style={{ width: 1 }} />
  } else {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          ...defaultStyles.rbgcpControlBtnWrapper,
        }}
        id={`rbgcp-color-type-btns${pickerIdSuffix}`}
      >
        <div
          onClick={setSolid}
          id={`rbgcp-solid-btn${pickerIdSuffix}`}
          style={colorTypeBtnStyles(!isGradient, defaultStyles)}
          // className="rbgcp-control-btn rbgcp-solid-btn"
        >
          {locales?.CONTROLS?.SOLID}
        </div>
        <div
          onClick={setGradient}
          id={`rbgcp-gradient-btn${pickerIdSuffix}`}
          style={colorTypeBtnStyles(isGradient ?? false, defaultStyles)}
          // className="rbgcp-control-btn rbgcp-gradient-btn"
        >
          {locales?.CONTROLS?.GRADIENT}
        </div>
      </div>
    )
  }
}

const InputTypeDropdown = ({
  openInputType,
  setOpenInputType,
}: {
  openInputType?: boolean
  setOpenInputType: (arg0: boolean) => void
}) => {
  const { inputType, setInputType, defaultStyles, pickerIdSuffix } = usePicker()
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
      // className="rbgcp-color-model-dropdown"
      style={{
        visibility: openInputType ? 'visible' : 'hidden',
        zIndex: openInputType ? '' : -100,
        opacity: openInputType ? 1 : 0,
        transition: `${oTrans}, ${vTrans}, ${zTrans}`,
        ...defaultStyles.rbgcpColorModelDropdown,
      }}
      id={`rbgcp-color-model-dropdown${pickerIdSuffix}`}
    >
      <div
        id={`rbgcp-color-model-rgb-btn${pickerIdSuffix}`}
        onClick={(e) => handleInputType(e, 'rgb')}
        style={modalBtnStyles(inputType === 'rgb', defaultStyles)}
      >
        RGB
      </div>
      <div
        id={`rbgcp-color-model-hsl-btn${pickerIdSuffix}`}
        onClick={(e) => handleInputType(e, 'hsl')}
        style={modalBtnStyles(inputType === 'hsl', defaultStyles)}
      >
        HSL
      </div>
      <div
        id={`rbgcp-color-model-hsv-btn${pickerIdSuffix}`}
        onClick={(e) => handleInputType(e, 'hsv')}
        style={modalBtnStyles(inputType === 'hsv', defaultStyles)}
      >
        HSV
      </div>
      <div
        id={`rbgcp-color-model-cmyk-btn${pickerIdSuffix}`}
        onClick={(e) => handleInputType(e, 'cmyk')}
        style={modalBtnStyles(inputType === 'cmyk', defaultStyles)}
      >
        CMYK
      </div>
    </div>
  )
}

const Controls = ({
  locales,
  hideEyeDrop = false,
  hideAdvancedSliders = false,
  hideColorGuide = false,
  hideInputType = false,
  hideColorTypeBtns = false,
  hideGradientControls = false,
  hideGradientType = false,
  hideGradientAngle = false,
  hideGradientStop = false,
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
  const { config, onChange, isGradient, handleChange, previous, defaultStyles, pickerIdSuffix } =
    usePicker()
  const { defaultColor, defaultGradient } = config
  const [openComparibles, setOpenComparibles] = useState(false)
  const [openInputType, setOpenInputType] = useState(false)
  const [openAdvanced, setOpenAdvanced] = useState(false)

  const noTools =
    hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType

  const solidColor = previous?.color ?? defaultColor
  const gradientColor = previous?.gradient ?? defaultGradient

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
      <div style={{ paddingBottom: 4 }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          id={`rbgcp-controls-wrapper${pickerIdSuffix}`}
          // className="rbgcp-controls-wrapper"
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
              style={{
                display: noTools ? 'none' : '',
                ...defaultStyles.rbgcpControlBtnWrapper,
              }}
              id={`rbgcp-control-rightside-wrapper${pickerIdSuffix}`}
              // className="rbgcp-control-btn-wrapper"
            >
              {!hideEyeDrop && <EyeDropper onSelect={handleChange} />}
              {!hideAdvancedSliders && (
                <div
                  id={`rbgcp-advanced-btn${pickerIdSuffix}`}
                  onClick={() => setOpenAdvanced(!openAdvanced)}
                  // className="rbgcp-control-btn rbgcp-advanced-btn"
                  style={controlBtnStyles(openAdvanced, defaultStyles)}
                >
                  <SlidersIcon color={openAdvanced ? '#568CF5' : ''} />
                </div>
              )}
              {!hideColorGuide && (
                <div
                  style={controlBtnStyles(openComparibles, defaultStyles)}
                  onClick={() => setOpenComparibles(!openComparibles)}
                  // className="rbgcp-control-btn rbgcp-comparibles-btn"
                  id={`rbgcp-comparibles-btn${pickerIdSuffix}`}
                >
                  <PaletteIcon color={openComparibles ? '#568CF5' : ''} />
                </div>
              )}
              {!hideInputType && (
                <div
                  id={`rbgcp-color-model-btn${pickerIdSuffix}`}
                  onClick={() => setOpenInputType(!openInputType)}
                  // className="rbgcp-control-btn rbgcp-color-model-btn"
                  style={controlBtnStyles(openInputType, defaultStyles)}
                >
                  <InputsIcon color={openInputType ? '#568CF5' : ''} />
                  <InputTypeDropdown
                    openInputType={openInputType}
                    setOpenInputType={setOpenInputType}
                  />
                </div>
              )}
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

export default Controls;
