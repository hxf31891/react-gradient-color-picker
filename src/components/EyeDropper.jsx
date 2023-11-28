import React, { useState } from 'react'
import Portal from './Portal'
import html2canvas from 'html2canvas'
import { controlBtnStyles } from './Controls'

var tc = require('tinycolor2')

const DropperIcon = ({ color }) => {
  const col = color || ''
  const style1 = {
    fill: 'none',
    stroke: col,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '1.4px',
  }
  const style2 = {
    fill: col,
    stroke: col,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '1.4px',
  }

  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ width: 16 }}
    >
      <path
        style={style1}
        className="rbgcp-control-icon"
        d="M15.6,7h0L7.78,14.86c-.37.37-1.61.38-2,.75s-.5,1.53-.76,2a3.53,3.53,0,0,1-.52.52,1.6,1.6,0,0,1-2.27-.06l-.32-.32a1.61,1.61,0,0,1-.06-2.27A3.25,3.25,0,0,1,2.4,15c.47-.26,1.65-.35,2-.73s.34-1.64.71-2c1.68-1.73,5.61-5.65,7.91-7.93h0l1.14,1.38L15.6,7Z"
      />
      <polygon
        style={style2}
        className="rbgcp-control-icon2"
        points="15.7 8.87 11.13 4.29 12.69 2.73 17.25 7.31 15.7 8.87"
      />
      <path
        style={style2}
        className="rbgcp-control-icon2"
        d="M18.18,3.71,16.36,5.53a1.33,1.33,0,0,1-1.88,0h0a1.34,1.34,0,0,1,0-1.89l1.81-1.82a1.34,1.34,0,0,1,1.89,0h0A1.34,1.34,0,0,1,18.18,3.71Z"
      />
    </svg>
  )
}

const Dropper = ({ onSelect }) => {
  const [pickerCanvas, setPickerCanvas] = useState('')
  const [coverUp, setCoverUp] = useState(false)

  const takePick = () => {
    let root = document.getElementById('root')
    setCoverUp(true)

    html2canvas(root).then((canvas) => {
      const blankCanvas = document.createElement('canvas')
      const ctx = blankCanvas.getContext('2d', { willReadFrequently: true })
      blankCanvas.width = root.offsetWidth * 2
      blankCanvas.height = root.offsetHeight * 2
      ctx.drawImage(canvas, 0, 0)

      setPickerCanvas(ctx)
    })
  }

  const getColorLegacy = (e) => {
    e.stopPropagation()
    let { pageX, pageY } = e
    const x1 = pageX * 2
    const y1 = pageY * 2
    let [r, g, b] = pickerCanvas.getImageData(x1, y1, 1, 1).data
    onSelect(`rgba(${r}, ${g}, ${b}, 1)`)
    setCoverUp(false)
  }

  const getEyeDrop = () => {
    if (!window.EyeDropper) {
      takePick()
    } else {
      const eyeDropper = new window.EyeDropper()
      const abortController = new window.AbortController()

      eyeDropper
        .open({ signal: abortController.signal })
        .then((result) => {
          let tinyHex = tc(result.sRGBHex)
          let { r, g, b } = tinyHex.toRgb()
          onSelect(`rgba(${r}, ${g}, ${b}, 1)`)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  return (
    <div>
      <div
        style={controlBtnStyles(coverUp)}
        id="rbgcp-eyedropper-btn"
        className="rbgcp-control-icon-btn rbgcp-eyedropper-btn"
        onClick={getEyeDrop}
      >
        <DropperIcon color={coverUp ? 'rgb(86, 140, 245)' : ''} />
      </div>

      {coverUp && (
        <Portal id="eyeDropCover">
          <div
            className="rbgcp-eyedropper-cover"
            onClick={(e) => getColorLegacy(e)}
          />
        </Portal>
      )}
    </div>
  )
}

export default Dropper
