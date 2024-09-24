import React from 'react'
import { usePicker } from '../context.js'

const ComparibleColors = ({
  openComparibles,
}: {
  openComparibles: boolean
}) => {
  const { tinyColor, handleChange, componentStyles } = usePicker()

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
        height: openComparibles ? 216 : 0,
        width: '100%',
        transition: 'all 120ms linear',
      }}
    >
      <div
        style={{
          paddingTop: 11,
          display: openComparibles ? '' : 'none',
          position: 'relative',
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
            ...componentStyles.ComparibleLabel,
          }}
        >
          Color Guide
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3,
            ...componentStyles.ComparibleLabel,
          }}
        >
          Analogous
        </div>
        <div style={{ borderRadius: 5, overflow: 'hidden', display: 'flex' }}>
          {analogous?.map((c: any, key: number) => (
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
            ...componentStyles.ComparibleLabel,
          }}
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
        >
          {monochromatic?.map((c: any, key: number) => (
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
            ...componentStyles.ComparibleLabel,
          }}
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
        >
          {triad?.map((c: any, key: number) => (
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
            ...componentStyles.ComparibleLabel,
          }}
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
        >
          {tetrad?.map((c: any, key: number) => (
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
