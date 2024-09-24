/* eslint-disable react/jsx-no-leaked-render */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import Portal from './Portal.js'
import html2canvas from 'html2canvas'
import { controlBtnStyles } from '../styles/styles.js'
import tc from 'tinycolor2'
import { usePicker } from '../context.js'

const DropperIcon = ({ color }: { color: string }) => {
  const { componentStyles } = usePicker()
  const col = color || ''
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ width: 16 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          fill: 'none',
          strokeWidth: '1.4px',
          ...componentStyles.rbgcpControlIcon,
          ...(col && { stroke: col }),
        }}
        d="M15.6,7h0L7.78,14.86c-.37.37-1.61.38-2,.75s-.5,1.53-.76,2a3.53,3.53,0,0,1-.52.52,1.6,1.6,0,0,1-2.27-.06l-.32-.32a1.61,1.61,0,0,1-.06-2.27A3.25,3.25,0,0,1,2.4,15c.47-.26,1.65-.35,2-.73s.34-1.64.71-2c1.68-1.73,5.61-5.65,7.91-7.93h0l1.14,1.38L15.6,7Z"
      />
      <polygon
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeWidth: '1.4px',
          ...componentStyles.rbgcpControlIcon2,
          ...(col && { stroke: col, fill: col }),
        }}
        points="15.7 8.87 11.13 4.29 12.69 2.73 17.25 7.31 15.7 8.87"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeWidth: '1.4px',
          ...componentStyles.rbgcpControlIcon2,
          ...(col && { stroke: col, fill: col }),
        }}
        d="M18.18,3.71,16.36,5.53a1.33,1.33,0,0,1-1.88,0h0a1.34,1.34,0,0,1,0-1.89l1.81-1.82a1.34,1.34,0,0,1,1.89,0h0A1.34,1.34,0,0,1,18.18,3.71Z"
      />
    </svg>
  )
}

const Dropper = ({ onSelect }: { onSelect: (arg0: string) => void }) => {
  const { componentStyles } = usePicker()
  const [pickerCanvas, setPickerCanvas] =
    useState<CanvasRenderingContext2D | null>(null)
  const [coverUp, setCoverUp] = useState(false)
  const [isPicking, setIsPicking] = useState(false)

  const takePick = () => {
    const root = document.getElementById('root')
    setCoverUp(true)

    // @ts-expect-error some error with this imported packages types
    html2canvas(root).then((canvas: any) => {
      const blankCanvas = document.createElement('canvas')
      const ctx = blankCanvas.getContext('2d', { willReadFrequently: true })

      if (root && ctx) {
        blankCanvas.width = root.offsetWidth * 2
        blankCanvas.height = root.offsetHeight * 2
        ctx.drawImage(canvas, 0, 0)
      }

      setPickerCanvas(ctx)
    })
  }

  const getColorLegacy = (e: any) => {
    e.stopPropagation()
    if (pickerCanvas) {
      const { pageX, pageY } = e
      const x1 = pageX * 2
      const y1 = pageY * 2
      const rgb = pickerCanvas.getImageData(x1, y1, 1, 1).data
      onSelect(`rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`)
    }
    setIsPicking(false)
    setCoverUp(false)
  }

  const getEyeDrop = () => {
    setIsPicking(true)
    // @ts-expect-error - ts does not evaluate for window.EyeDropper
    if (!window.EyeDropper) {
      takePick()
    } else {
      // @ts-expect-error - ts does not evaluate for window.EyeDropper
      const eyeDropper = new window.EyeDropper()
      const abortController = new window.AbortController()

      eyeDropper
        .open({ signal: abortController.signal })
        .then((result: any) => {
          const tinyHex = tc(result.sRGBHex)
          const { r, g, b } = tinyHex.toRgb()
          onSelect(`rgba(${r}, ${g}, ${b}, 1)`)
          setIsPicking(false)
        })
        .catch((e: any) => {
          console.log(e)
          setIsPicking(false)
        })
    }
  }

  return (
    <div>
      <div
        onClick={getEyeDrop}
        id="rbgcp-eyedropper-btn"
        style={{
          ...componentStyles.rbgcpEyedropperBtn,
          ...controlBtnStyles(coverUp, componentStyles),
        }}
      >
        <DropperIcon color={isPicking ? 'rgb(86, 140, 245)' : ''} />
      </div>

      {coverUp && (
        <Portal>
          <div
            onClick={(e) => getColorLegacy(e)}
            style={componentStyles.rbgcpEyedropperCover}
          />
        </Portal>
      )}
    </div>
  )
}

export default Dropper
