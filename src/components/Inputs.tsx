import React, { useState, useEffect } from 'react'
import { Styles } from '../shared/types.js'
import { formatInputValues, round } from '../utils/formatters.js'
import { rgb2cmyk, cmykToRgb, getHexAlpha } from '../utils/converters.js'
import { usePicker } from '../context.js'
import tc from 'tinycolor2'

const Input = ({
  label,
  value,
  callback,
  max = 100,
  hideOpacity,
  defaultStyles,
  pickerIdSuffix,
}: {
  max?: number
  label: string
  value: number
  hideOpacity: boolean
  defaultStyles: Styles
  pickerIdSuffix: string
  callback: (arg0: number) => void
}) => {
  const [temp, setTemp] = useState(value)
  const width = hideOpacity ? '25%' : '20%'

  useEffect(() => {
    setTemp(value)
  }, [value])

  const onChange = (e: any) => {
    const newVal = formatInputValues(parseFloat(e.target.value), 0, max)
    setTemp(newVal)
    callback(newVal)
  }

  return (
    <div
      style={{ width: width, flexShrink: 1 }}
      id={`rbgcp-${label}-input-wrapper${pickerIdSuffix}`}
    >
      <input
        value={temp}
        onChange={(e) => onChange(e)}
        style={{ ...defaultStyles.rbgcpInput }}
        id={`rbgcp-${label}-input${pickerIdSuffix}`}
        // className="rbgcp-input"
      />
      <div style={{ ...defaultStyles.rbgcpInputLabel }}>{label}</div>
    </div>
  )
}

const HexInput = ({
  opacity,
  tinyColor,
  showHexAlpha,
  handleChange,
  defaultStyles,
  pickerIdSuffix,
}: {
  tinyColor: any
  opacity: number
  showHexAlpha: boolean
  defaultStyles: Styles
  pickerIdSuffix: string
  handleChange: (arg0: string) => void
}) => {
  const [disable, setDisable] = useState('')
  const hex = tinyColor.toHex()
  const [newHex, setNewHex] = useState(hex)

  useEffect(() => {
    if (disable !== 'hex') {
      setNewHex(hex)
    }
  }, [tinyColor, disable, hex])

  const hexFocus = () => {
    setDisable('hex')
  }

  const hexBlur = () => {
    setDisable('')
  }

  const handleHex = (e: any) => {
    const tinyHex = tc(e.target.value)
    setNewHex(e.target.value)
    if (tinyHex.isValid()) {
      const { r, g, b } = tinyHex.toRgb()
      const newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`
      handleChange(newColor)
    }
  }

  const displayValue = showHexAlpha ? `${newHex}${getHexAlpha(opacity)}` : newHex
  const label = showHexAlpha ? 'HEXA' : 'HEX'
  const width = showHexAlpha ? 88 : 76

  return (
    <div
      style={{ width, flexShrink: 0 }}
      id={`rbgcp-hex-input-wrapper${pickerIdSuffix}`}
    >
      <input
        onBlur={hexBlur}
        onFocus={hexFocus}
        onChange={(e) => handleHex(e)}
        value={displayValue?.toUpperCase()}
        id={`rbgcp-hex-input${pickerIdSuffix}`}
        style={{ ...defaultStyles.rbgcpInput, ...defaultStyles.rbgcpHexInput }}
      />
      <div style={{ ...defaultStyles.rbgcpInputLabel }}>{label}</div>
    </div>
  )
}

const RGBInputs = ({
  hc,
  hideOpacity,
  handleChange,
  defaultStyles,
  pickerIdSuffix,
}: {
  hc: any
  hideOpacity: boolean
  defaultStyles: Styles
  pickerIdSuffix: string
  handleChange: (arg0: string) => void
}) => {
  const handleRgb = ({ r, g, b }: { r: number; g: number; b: number }) => {
    handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`)
  }

  return (
    <>
      <Input
        label="R"
        max={255}
        value={hc?.r}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleRgb({ r: newVal, g: hc?.g, b: hc?.b })}
      />
      <Input
        label="G"
        max={255}
        value={hc?.g}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleRgb({ r: hc?.r, g: newVal, b: hc?.b })}
      />
      <Input
        label="B"
        max={255}
        value={hc?.b}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleRgb({ r: hc?.r, g: hc?.g, b: newVal })}
      />
    </>
  )
}

const HSLInputs = ({
  hc,
  setHc,
  tinyColor,
  hideOpacity,
  handleChange,
  defaultStyles,
  pickerIdSuffix,
}: {
  hc: any
  tinyColor: any
  hideOpacity: boolean
  defaultStyles: Styles
  pickerIdSuffix: string
  setHc: (arg0: any) => void
  handleChange: (arg0: string) => void
}) => {
  const { s, l } = tinyColor.toHsl()

  const handleH = (h: number, s: number, l: number) => {
    const { r, g, b } = tc({ h: h, s: s, l: l }).toRgb()
    handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`)
    setHc({ ...hc, h })
  }

  const handleSl = (value: any) => {
    const { r, g, b } = tc(value).toRgb()
    handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`)
  }

  return (
    <>
      <Input
        label="H"
        max={360}
        value={round(hc?.h)}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleH(newVal, s, l)}
      />
      <Input
        label="S"
        value={round(s * 100)}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleSl({ h: hc?.h, s: newVal, l: l })}
      />
      <Input
        label="L"
        value={round(l * 100)}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleSl({ h: hc?.h, s: s, l: newVal })}
      />
    </>
  )
}

const HSVInputs = ({
  hc,
  setHc,
  hideOpacity,
  handleChange,
  defaultStyles,
  pickerIdSuffix,
}: {
  hc: any
  hideOpacity: boolean
  defaultStyles: Styles
  pickerIdSuffix: string
  setHc: (arg0: any) => void
  handleChange: (arg0: string) => void
}) => {
  const handleH = (h: number, s: number, v: number) => {
    const { r, g, b } = tc({ h: h, s: s, v: v }).toRgb()
    handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`)
    setHc({ ...hc, h })
  }

  const handleSV = (value: any) => {
    const { r, g, b } = tc(value).toRgb()
    handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`)
  }

  return (
    <>
      <Input
        label="H"
        max={360}
        value={round(hc?.h)}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleH(newVal, hc?.s, hc?.v)}
      />
      <Input
        label="S"
        hideOpacity={hideOpacity}
        value={round(hc?.s * 100)}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleSV({ h: hc?.h, s: newVal, v: hc?.v })}
      />
      <Input
        label="V"
        hideOpacity={hideOpacity}
        value={round(hc?.v * 100)}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleSV({ h: hc?.h, s: hc?.s, v: newVal })}
      />
    </>
  )
}

const CMKYInputs = ({
  hc,
  hideOpacity,
  handleChange,
  defaultStyles,

  pickerIdSuffix,
}: {
  hc: any
  hideOpacity: boolean
  defaultStyles: Styles
  pickerIdSuffix: string
  handleChange: (arg0: string) => void
}) => {
  const { c, m, y, k } = rgb2cmyk(hc?.r, hc?.g, hc?.b)

  const handleCmyk = (value: any) => {
    const { r, g, b } = cmykToRgb(value)
    handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`)
  }

  return (
    <>
      <Input
        label="C"
        value={round(c * 100)}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleCmyk({ c: newVal / 100, m: m, y: y, k: k })}
      />
      <Input
        label="M"
        value={round(m * 100)}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleCmyk({ c: c, m: newVal / 100, y: y, k: k })}
      />
      <Input
        label="Y"
        value={round(y * 100)}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleCmyk({ c: c, m: m, y: newVal / 100, k: k })}
      />
      <Input
        label="K"
        value={round(k * 100)}
        hideOpacity={hideOpacity}
        defaultStyles={defaultStyles}
        pickerIdSuffix={pickerIdSuffix}
        callback={(newVal) => handleCmyk({ c: c, m: m, y: y, k: newVal / 100 })}
      />
    </>
  )
}

const Inputs = () => {
  const {
    hc,
    setHc,
    inputType,
    tinyColor,
    hideOpacity,
    showHexAlpha,
    handleChange,
    defaultStyles,
    pickerIdSuffix,
  } = usePicker()

  return (
    <div
      style={{
        columnGap: 6,
        paddingTop: 14,
        display: 'flex',
        justifyContent: 'space-between',
        ...defaultStyles.rbgcpInputsWrap,
      }}
      id={`rbgcp-inputs-wrap${pickerIdSuffix}`}
    >
      {inputType !== 'cmyk' && (
        <HexInput
          opacity={hc?.a}
          tinyColor={tinyColor}
          showHexAlpha={showHexAlpha}
          handleChange={handleChange}
          defaultStyles={defaultStyles}
          pickerIdSuffix={pickerIdSuffix}
        />
      )}
      {inputType === 'hsl' && (
        <HSLInputs
          hc={hc}
          setHc={setHc}
          tinyColor={tinyColor}
          hideOpacity={hideOpacity}
          handleChange={handleChange}
          defaultStyles={defaultStyles}
          pickerIdSuffix={pickerIdSuffix}
        />
      )}
      {inputType === 'rgb' && (
        <RGBInputs
          hc={hc}
          hideOpacity={hideOpacity}
          handleChange={handleChange}
          defaultStyles={defaultStyles}
          pickerIdSuffix={pickerIdSuffix}
        />
      )}
      {inputType === 'hsv' && (
        <HSVInputs
          hc={hc}
          setHc={setHc}
          hideOpacity={hideOpacity}
          handleChange={handleChange}
          defaultStyles={defaultStyles}
          pickerIdSuffix={pickerIdSuffix}
        />
      )}
      {inputType === 'cmyk' && (
        <CMKYInputs
          hc={hc}
          hideOpacity={hideOpacity}
          handleChange={handleChange}
          defaultStyles={defaultStyles}
          pickerIdSuffix={pickerIdSuffix}
        />
      )}

      {!hideOpacity && (
        <Input
          label="A"
          hideOpacity={hideOpacity}
          defaultStyles={defaultStyles}
          value={Math.round(hc?.a * 100)}
          pickerIdSuffix={pickerIdSuffix}
          callback={(newVal: number) =>
            handleChange(`rgba(${hc?.r}, ${hc?.g}, ${hc?.b}, ${newVal / 100})`)
          }
        />
      )}
    </div>
  )
}

export default Inputs
