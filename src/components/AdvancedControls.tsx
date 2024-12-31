import React, { useState, useRef, useEffect } from 'react'
import { Styles, Config } from '../shared/types.js'
import { getHandleValue } from '../utils/utils.js'
import { usePicker } from '../context.js'
import {
  usePaintSat,
  usePaintLight,
  usePaintBright,
} from '../hooks/usePaintHue.js'
import tinycolor from 'tinycolor2'

const AdvBar = ({
  value,
  reffy,
  label,
  config,
  callback,
  squareWidth,
  openAdvanced,
  defaultStyles,
  pickerIdSuffix,
}: {
  reffy: any
  value: number
  label: string
  config: Config
  squareWidth: number
  openAdvanced: boolean
  defaultStyles: Styles
  pickerIdSuffix: string
  callback: (arg0: number) => void
}) => {
  const { barSize } = config
  const [dragging, setDragging] = useState<boolean>(false)
  const [handleTop, setHandleTop] = useState<number>(2)
  const left = value * (squareWidth - 18)

  useEffect(() => {
    setHandleTop(reffy?.current?.offsetTop - 2)
  }, [openAdvanced, reffy])

  const stopDragging = () => {
    setDragging(false)
  }

  const handleMove = (e: any) => {
    if (dragging) {
      callback(getHandleValue(e, barSize))
    }
  }

  const handleClick = (e: any) => {
    if (!dragging) {
      callback(getHandleValue(e, barSize))
    }
  }

  const handleDown = () => {
    setDragging(true)
  }

  useEffect(() => {
    const handleUp = () => {
      stopDragging()
    }

    window.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mouseup', handleUp)
    }
  }, [])

  return (
    <div style={{ width: '100%', padding: '3px 0px 3px 0px' }}>
      <div
        onMouseMove={(e) => handleMove(e)}
        // className="rbgcp-advanced-bar-wrap"
        style={{ cursor: 'resize', position: 'relative' }}
        id={`rbgcp-advanced-bar-${label}-wrapper${pickerIdSuffix}`}
      >
        <div
          style={{ left, top: handleTop, ...defaultStyles.rbgcpHandle }}
          id={`rbgcp-advanced-bar-${label}-handle${pickerIdSuffix}`}
          // className="rbgcp-advanced-bar-handle"
          onMouseDown={handleDown}
          role="button"
          tabIndex={0}
        />
        <div
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 12,
            fontWeight: 500,
            lineHeight: 1,
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, 0%)',
            top: handleTop + 2,
            zIndex: 10,
            textShadow: '1px 1px 1px rgba(0,0,0,.6)',
          }}
          id={`rbgcp-advanced-bar-${label}-label${pickerIdSuffix}`}
          // className="rbgcp-advanced-bar-label"
          onMouseMove={(e) => handleMove(e)}
          onClick={(e) => handleClick(e)}
          tabIndex={0}
          role="button"
          onKeyDown={() => {
            return
          }}
        >
          {label}
        </div>
        <canvas
          ref={reffy}
          height="14px"
          width={`${squareWidth}px`}
          onClick={(e) => handleClick(e)}
          // className="rbgcp-advanced-bar-canvas"
          style={{ position: 'relative', borderRadius: 14 }}
          id={`rbgcp-advanced-bar-${label}-canvas${pickerIdSuffix}`}
        />
      </div>
    </div>
  )
}

const AdvancedControls = ({ openAdvanced }: { openAdvanced: boolean }) => {
  const { config, tinyColor, handleChange, squareWidth, hc, defaultStyles, pickerIdSuffix } = usePicker()
  const { s, l } = tinyColor.toHsl()

  const satRef = useRef(null)
  const lightRef = useRef(null)
  const brightRef = useRef(null)
  usePaintSat(satRef, hc?.h, l * 100, squareWidth)
  usePaintLight(lightRef, hc?.h, s * 100, squareWidth)
  usePaintBright(brightRef, hc?.h, s * 100, squareWidth)

  const satDesat = (value: number) => {
    const { r, g, b } = tinycolor({ h: hc?.h, s: value / 100, l }).toRgb()
    handleChange(`rgba(${r},${g},${b},${hc?.a})`)
  }

  const setLight = (value: number) => {
    const { r, g, b } = tinycolor({ h: hc?.h, s, l: value / 100 }).toRgb()
    handleChange(`rgba(${r},${g},${b},${hc?.a})`)
  }

  const setBright = (value: number) => {
    const { r, g, b } = tinycolor({
      h: hc?.h,
      s: hc?.s * 100,
      v: value,
    }).toRgb()
    handleChange(`rgba(${r},${g},${b},${hc?.a})`)
  }

  return (
    <div
      style={{
        width: '100%',
        height: openAdvanced ? 98 : 0,
        transition: 'all 120ms linear',
      }}
      id={`rbgcp-advanced-controls-wrapper${pickerIdSuffix}`}
      // className="rbgcp-advanced-controls-wrap"
    >
      <div
        style={{
          paddingTop: 11,
          display: openAdvanced ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: openAdvanced ? 98 : 0,
          overflow: 'hidden',
          transition: 'height 100ms linear',
        }}
        id={`rbgcp-advanced-controls-inner${pickerIdSuffix}`}
        // className="rbgcp-advanced-controls-inner"
      >
        <AdvBar
          value={s}
          reffy={satRef}
          config={config}
          label="Saturation"
          callback={satDesat}
          squareWidth={squareWidth}
          openAdvanced={openAdvanced}
          defaultStyles={defaultStyles}
          pickerIdSuffix={pickerIdSuffix}
        />
        <AdvBar
          value={l}
          config={config}
          reffy={lightRef}
          label="Lightness"
          callback={setLight}
          squareWidth={squareWidth}
          openAdvanced={openAdvanced}
          defaultStyles={defaultStyles}
          pickerIdSuffix={pickerIdSuffix}
        />
        <AdvBar
          value={hc?.v}
          config={config}
          reffy={brightRef}
          label="Brightness"
          callback={setBright}
          squareWidth={squareWidth}
          openAdvanced={openAdvanced}
          defaultStyles={defaultStyles}
          pickerIdSuffix={pickerIdSuffix}
        />
      </div>
    </div>
  )
}

export default AdvancedControls
