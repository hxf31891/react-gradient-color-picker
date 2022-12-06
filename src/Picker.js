import React from 'react'
import Hue from './Hue'
import Inputs from './Inputs'
import Square from './Square'
import Opacity from './Opacity'
import Presets from './Presets'
import Controls from './Controls'
import PropTypes from 'prop-types'
import GradientBar from './GradientBar'
import { usePicker } from './context'

const Picker = ({
  hideControls,
  hideInputs,
  hidePresets,
                  hideOpacity,
  presets,
  hideEyeDrop,
  hideAdvancedSliders,
  hideColorGuide,
  hideInputType,
}) => {
  const { isGradient } = usePicker()

  return (
    <div style={{ userSelect: 'none' }}>
      <Square />
      {!hideControls && (
        <Controls
          hideEyeDrop={hideEyeDrop}
          hideAdvancedSliders={hideAdvancedSliders}
          hideColorGuide={hideColorGuide}
          hideInputType={hideInputType}
        />
      )}
      {isGradient && <GradientBar />}
      <Hue />
      {!hideOpacity && <Opacity />}
      {!hideInputs && <Inputs />}
      {!hidePresets && <Presets presets={presets} />}
    </div>
  )
}

export default Picker

Picker.propTypes = {
  hideControls: PropTypes.bool,
  hideInputs: PropTypes.bool,
  hidePresets: PropTypes.bool,
  presets: PropTypes.array,
  hideEyeDrop: PropTypes.bool,
  hideAdvancedSliders: PropTypes.bool,
  hideColorGuide: PropTypes.bool,
  hideInputType: PropTypes.bool,
}
