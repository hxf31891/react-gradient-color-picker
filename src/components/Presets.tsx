import React from 'react'
import { usePicker } from '../context.js'
import { fakePresets } from '../constants.js'

const Presets = ({ presets = [] }: { presets?: string[] }) => {
  const { value, onChange, handleChange, squareSize } = usePicker()

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

  return (
    <div
      style={{
        display: 'flex',
        marginTop: 14,
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          background: value,
          borderRadius: 6,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: squareSize - 66,
          justifyContent: 'space-between',
        }}
      >
        {getPresets().map((p: any, key: number) => (
          <div
            key={`${p}-${key}`}
            style={{
              height: 23,
              width: '10.2%',
              borderRadius: 4,
              background: p,
              marginBottom: 2,
              border: p === 'rgba(255,255,255, 1)' ? '1px solid #96959c' : '',
            }}
            onClick={() => handlePresetClick(p)}
          />
        ))}
      </div>
    </div>
  )
}

export default Presets
