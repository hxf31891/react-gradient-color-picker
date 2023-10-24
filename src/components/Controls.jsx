import React, { useState } from 'react'
import { SlidersIcon, InputsIcon, PaletteIcon } from './icon'
import { usePicker } from '../context'
import EyeDropper from './EyeDropper'
import { config } from '../constants'
import AdvancedControls from './AdvancedControls'
import ComparibleColors from './ComparibleColors'
import GradientControls from './GradientControls'
import {
  ac,
  df,
  jc,
  jsb,
  inputDropdown,
  psRl,
  jfe,
  controlBtn,
  borderBox,
} from '../style'

var { defaultColor, defaultGradient } = config

const Controls = ({
  hideEyeDrop,
  hideAdvancedSliders,
  hideColorGuide,
  hideInputType,
  hideColorTypeBtns,
  hideGradientControls,
  hideGradientType,
  hideGradientAngle,
  hideGradientStop,
  locales,
}) => {
  const {
    isGradient,
    internalOnChange,
    previousColors,
    previousGraidents,
    handleChange,
  } = usePicker()
  const [openAdvanced, setOpenAdvanced] = useState(false)
  const [openComparibles, setOpenComparibles] = useState(false)
  const [openInputType, setOpenInputType] = useState(false)
  const noTools =
    hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType

  const solidColor = previousColors?.[0] || defaultColor
  const gradientColor = previousGraidents?.[0] || defaultGradient

  const setSolid = () => {
    internalOnChange(solidColor)
  }

  const setGradient = () => {
    internalOnChange(gradientColor)
  }

  const allRightControlsHidden = hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType;

  return (
    <div style={{ paddingTop: 12, paddingBottom: 4 }}>
      <div style={{ width: '100%', ...df, ...jsb, ...ac }}>
        <div
          style={{
            height: 28,
            background: hideColorTypeBtns ? '' : '#e9e9f5',
            borderRadius: 6,
            padding: 2,
            ...df,
            ...jc,
            ...ac,
            ...borderBox,
          }}
        >
          {!hideColorTypeBtns && (
            <>
              <div
                style={{
                  ...controlBtn,
                  ...controlBtnStyles(!isGradient),
                  ...df,
                  ...ac,
                }}
                onClick={setSolid}
              >
                {locales.CONTROLS.SOLID}
              </div>
              <div
                style={{
                  ...controlBtn,
                  ...controlBtnStyles(isGradient),
                  ...df,
                  ...ac,
                }}
                onClick={setGradient}
              >
                {locales.CONTROLS.GRADIENT}
              </div>
            </>
          )}
        </div>

        {!allRightControlsHidden && (
          <div
            style={{
              ...ac,
              ...jfe,
              height: 28,
              background: '#e9e9f5',
              borderRadius: 6,
              padding: 2,
              display: noTools ? 'none' : '',
              ...df,
              ...borderBox,
            }}
          >
            {!hideEyeDrop && (
              <EyeDropper
                onSelect={handleChange}
                buttonStyle={{
                  width: 30,
                  height: 24,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            )}
            <div
              style={{
                width: 30,
                ...controlBtnStyles(openAdvanced),
                height: 24,
                borderRadius: 4,
                display: hideAdvancedSliders ? 'none' : 'flex',
                ...jc,
                ...ac,
              }}
              onClick={() => setOpenAdvanced(!openAdvanced)}
            >
              <SlidersIcon color={openAdvanced ? '#568CF5' : ''} />
            </div>
            <div
              style={{
                width: 30,
                ...controlBtnStyles(openComparibles),
                height: 24,
                borderRadius: 4,
                display: hideColorGuide ? 'none' : 'flex',
                ...jc,
                ...ac,
              }}
              onClick={() => setOpenComparibles(!openComparibles)}
            >
              <PaletteIcon color={openComparibles ? '#568CF5' : ''} />
            </div>
            <div
              style={{
                width: 30,
                ...controlBtnStyles(openInputType),
                height: 24,
                borderRadius: 4,
                display: hideInputType ? 'none' : 'flex',
                ...jc,
                ...ac,
                ...psRl,
              }}
              onClick={() => setOpenInputType(!openInputType)}
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
      {!hideAdvancedSliders && <AdvancedControls openAdvanced={openAdvanced} />}
      {!hideColorGuide && (
        <ComparibleColors openComparibles={openComparibles} />
      )}
      {(isGradient && !hideGradientControls) && (
        <GradientControls
          hideGradientType={hideGradientType}
          hideGradientAngle={hideGradientAngle}
          hideGradientStop={hideGradientStop}
        />
      )}
    </div>
  )
}

export default Controls

const InputTypeDropdown = ({ openInputType, setOpenInputType }) => {
  const { inputType, setInputType } = usePicker()
  const vTrans = openInputType
    ? 'visibility 0ms linear'
    : 'visibility 100ms linear 150ms'
  const zTrans = openInputType
    ? 'z-index 0ms linear'
    : 'z-index 100ms linear 150ms'
  const oTrans = openInputType
    ? 'opacity 120ms linear'
    : 'opacity 150ms linear 50ms'

  const handleInputType = (e, val) => {
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
        ...inputDropdown,
      }}
    >
      <div
        style={{
          ...df,
          ...ac,
          ...psRl,
          ...controlBtn,
          ...controlBtnStyles(inputType === 'rgb'),
        }}
        onClick={e => handleInputType(e, 'rgb')}
      >
        RGB
      </div>
      <div
        style={{
          ...df,
          ...ac,
          ...controlBtn,
          ...controlBtnStyles(inputType === 'hsl'),
        }}
        onClick={e => handleInputType(e, 'hsl')}
      >
        HSL
      </div>
      <div
        style={{
          ...df,
          ...ac,
          ...controlBtn,
          ...controlBtnStyles(inputType === 'hsv'),
        }}
        onClick={e => handleInputType(e, 'hsv')}
      >
        HSV
      </div>
      <div
        style={{
          ...df,
          ...ac,
          ...controlBtn,
          ...controlBtnStyles(inputType === 'cmyk'),
        }}
        onClick={e => handleInputType(e, 'cmyk')}
      >
        CMYK
      </div>
    </div>
  )
}

export const controlBtnStyles = selected => {
  return {
    background: selected ? 'white' : 'rgba(255,255,255,0)',
    color: selected ? '#568CF5' : 'rgb(86,86,86)',
    boxShadow: selected
      ? '1px 1px 3px rgba(0,0,0,.2)'
      : '1px 1px 3px rgba(0,0,0,0)',
  }
}
