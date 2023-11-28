import React from 'react'
import { usePicker } from '../context'

const ComparibleColors = ({ openComparibles }) => {
  const { tinyColor, handleChange } = usePicker()

  const analogous = tinyColor.analogous()
  const monochromatic = tinyColor.monochromatic()
  const triad = tinyColor.triad()
  const tetrad = tinyColor.tetrad()

  const handleClick = (tiny) => {
    let { r, g, b, a } = tiny.toRgb()
    handleChange(`rgba(${r},${g},${b},${a})`)
  }

  return (
    <div
      style={{
        height: openComparibles ? 216 : 0,
        width: '100%',
        transition: 'all 120ms linear',
      }}
    >
      <div
        style={{
          paddingTop: 11,
          display: openComparibles ? '' : 'none',
          position: "relative"
        }}
      >
        <div
          style={{
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 600,
            position: 'absolute',
            top: 6.5,
            left: 2,
          }}
          className="rbgcp-comparible-label"
        >
          Color Guide
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3,
          }}
          className="rbgcp-comparible-label"
        >
          Analogous
        </div>
        <div style={{ borderRadius: 5, overflow: 'hidden', display: 'flex' }}>
          {analogous?.map((c, key) => (
            <div
              key={key}
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
          }}
          className="rbgcp-comparible-label"
        >
          Monochromatic
        </div>
        <div style={{ borderRadius: 5, overflow: 'hidden', display: 'flex', justifyContent: "flex-end" }}>
          {monochromatic?.map((c, key) => (
            <div
              key={key}
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
          }}
          className="rbgcp-comparible-label"
        >
          Triad
        </div>
        <div style={{ borderRadius: 5, overflow: 'hidden', display: 'flex', justifyContent: "flex-end" }}>
          {triad?.map((c, key) => (
            <div
              key={key}
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
          }}
          className="rbgcp-comparible-label"
        >
          Tetrad
        </div>
        <div style={{ borderRadius: 5, overflow: 'hidden', display: 'flex', justifyContent: "flex-end" }}>
          {tetrad?.map((c, key) => (
            <div
              key={key}
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
