/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { usePicker } from '../context.js'
import { fakePresets } from '../constants.js'

const Presets = ({ presets = [] }: { presets?: string[] }) => {
  const {
    value,
    onChange,
    isDarkMode,
    squareWidth,
    handleChange,
    pickerIdSuffix,
  } = usePicker()

  const getPresets = () => {
    if (presets?.length > 0) {
      return presets?.slice(0, 18)
    } else {
      return fakePresets
    }
  }

  const handlePresetClick = (preset: string) => {
    if (preset?.includes('gradient')) {
      onChange(preset)
    } else {
      handleChange(preset)
    }
  }

  const getBorder = (p: string) => {
    if (!p || isDarkMode) return ''
    const c = p?.replace(' ', '');
    if (c === 'rgba(255,255,255,1)') {
      return '1px solid #96959c'
    }
    return ''
  }

  return (
    <div
      style={{
        marginTop: 14,
        display: 'flex',
        justifyContent: 'space-between',
      }}
      id={`rbgcp-footer-wrapper${pickerIdSuffix}`}
      // className="rbgcp-presets-wrap"
    >
      <div
        style={{
          width: 50,
          height: 50,
          flexShrink: 0,
          borderRadius: 6,
          background: value,
          border: getBorder(value),
        }}
        id={`rbgcp-preview${pickerIdSuffix}`}
        // className="rbgcp-preset-color-preview"
      />
      <div
        style={{
          rowGap: 3,
          display: 'flex',
          flexWrap: 'wrap',
          width: squareWidth - 57,
          justifyContent: 'space-between',
        }}
        id={`rbgcp-presets-wrapper${pickerIdSuffix}`}
        // className="rbgcp-presets-list"
      >
        {getPresets().map((p: any, key: number) => (
          <div
            key={`${p}-${key}`}
            id={`rbgcp-preset-${key}-wrapper${pickerIdSuffix}`}
            style={{ width: `calc(100% / 9)`, paddingLeft: 3 }}
          >
            <div
              style={{
                height: 23.5,
                width: '100%',
                background: p,
                borderRadius: 4,
                border: getBorder(p),
              }}
              // className="rbgcp-preset-color"
              onClick={() => handlePresetClick(p)}
              id={`rbgcp-preset-${key}${pickerIdSuffix}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Presets
