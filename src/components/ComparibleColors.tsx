import React from 'react'
import { usePicker } from '../context.js'

const ComparibleColors = ({
  openComparibles,
}: {
  openComparibles: boolean
}) => {
  const { tinyColor, handleChange, defaultStyles, pickerIdSuffix } = usePicker()

  const analogous = tinyColor.analogous()
  const monochromatic = tinyColor.monochromatic()
  const triad = tinyColor.triad()
  const tetrad = tinyColor.tetrad()

  const handleClick = (tiny: any) => {
    const { r, g, b, a } = tiny.toRgb()
    handleChange(`rgba(${r},${g},${b},${a})`)
  }

  return (
    <div
      style={{
        width: '100%',
        transition: 'all 120ms linear',
        height: openComparibles ? 216 : 0,
      }}
      id={`rbgcp-comparible-colors-wrapper${pickerIdSuffix}`}
      // className="rbgcp-comparible-colors-wrap"
    >
      <div
        style={{
          paddingTop: 11,
          display: openComparibles ? '' : 'none',
          position: 'relative',
        }}
        id={`rbgcp-comparible-colors-inner${pickerIdSuffix}`}
        // className="rbgcp-comparible-colors-inner"
      >
        <div
          style={{
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 600,
            position: 'absolute',
            top: 6.5,
            left: 2,
            ...defaultStyles.rbgcpComparibleLabel,
          }}
          id={`rbgcp-comparible-color-guide-label${pickerIdSuffix}`}
          // className="rbgcp-comparible-colors-label"
        >
          Color Guide
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3,
            ...defaultStyles.rbgcpComparibleLabel,
          }}
          id={`rbgcp-comparible-analogous-colors-label${pickerIdSuffix}`}
          // className="rbgcp-comparible-colors-label"
        >
          Analogous
        </div>
        <div
          style={{ borderRadius: 5, overflow: 'hidden', display: 'flex' }}
          id={`rbgcp-comparible-analogous-colors${pickerIdSuffix}`}
          // className="rbgcp-comparible-colors-colors"
        >
          {analogous?.map((c: any, key: number) => (
            <div
              key={key}
              id={`rbgcp-comparible-analogous-color-${key}${pickerIdSuffix}`}
              style={{ width: '20%', height: 30, background: c.toHexString() }}
              onClick={() => handleClick(c)}
            />
          ))}
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3,
            ...defaultStyles.rbgcpComparibleLabel,
          }}
          id={`rbgcp-comparible-monochromatic-colors-label${pickerIdSuffix}`}
          // className="rbgcp-comparible-colors-label"
        >
          Monochromatic
        </div>
        <div
          style={{
            borderRadius: 5,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          id={`rbgcp-comparible-monochromatic-colors${pickerIdSuffix}`}
          // className="rbgcp-comparible-colors-colors"
        >
          {monochromatic?.map((c: any, key: number) => (
            <div
              key={key}
              id={`rbgcp-comparible-monochromatic-color-${key}${pickerIdSuffix}`}
              style={{ width: '20%', height: 30, background: c.toHexString() }}
              onClick={() => handleClick(c)}
            />
          ))}
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3,
            ...defaultStyles.rbgcpComparibleLabel,
          }}
          id={`rbgcp-comparible-triad-colors-label${pickerIdSuffix}`}
          // className="rbgcp-comparible-colors-label"
        >
          Triad
        </div>
        <div
          style={{
            borderRadius: 5,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          id={`rbgcp-comparible-triad-colors${pickerIdSuffix}`}
          // className="rbgcp-comparible-colors-colors"
        >
          {triad?.map((c: any, key: number) => (
            <div
              key={key}
              id={`rbgcp-comparible-triad-color-${key}${pickerIdSuffix}`}
              style={{
                width: 'calc(100% / 3)',
                height: 28,
                background: c.toHexString(),
              }}
              onClick={() => handleClick(c)}
            />
          ))}
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3,
            ...defaultStyles.rbgcpComparibleLabel,
          }}
          id={`rbgcp-comparible-tetrad-colors-label${pickerIdSuffix}`}
          // className="rbgcp-comparible-colors-label"
        >
          Tetrad
        </div>
        <div
          style={{
            borderRadius: 5,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          id={`rbgcp-comparible-tetrad-colors${pickerIdSuffix}`}
          // className="rbgcp-comparible-colors-colors"
        >
          {tetrad?.map((c: any, key: number) => (
            <div
              key={key}
              id={`rbgcp-comparible-tetrad-color-${key}${pickerIdSuffix}`}
              style={{ width: '25%', height: 28, background: c.toHexString() }}
              onClick={() => handleClick(c)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ComparibleColors
