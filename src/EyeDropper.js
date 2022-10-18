import React, { useState } from 'react'
import Portal from './Portal'
import html2canvas from 'html2canvas'
import { controlBtnStyles } from './Controls'

const DropperIcon = ({ color }) => {
  const col = color || '#323136'
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
        d="M15.6,7h0L7.78,14.86c-.37.37-1.61.38-2,.75s-.5,1.53-.76,2a3.53,3.53,0,0,1-.52.52,1.6,1.6,0,0,1-2.27-.06l-.32-.32a1.61,1.61,0,0,1-.06-2.27A3.25,3.25,0,0,1,2.4,15c.47-.26,1.65-.35,2-.73s.34-1.64.71-2c1.68-1.73,5.61-5.65,7.91-7.93h0l1.14,1.38L15.6,7Z"
      />
      <polygon
        style={style2}
        points="15.7 8.87 11.13 4.29 12.69 2.73 17.25 7.31 15.7 8.87"
      />
      <path
        style={style2}
        d="M18.18,3.71,16.36,5.53a1.33,1.33,0,0,1-1.88,0h0a1.34,1.34,0,0,1,0-1.89l1.81-1.82a1.34,1.34,0,0,1,1.89,0h0A1.34,1.34,0,0,1,18.18,3.71Z"
      />
    </svg>
  )
}

const EyeDropper = ({ onSelect, buttonStyle }) => {
  const [pickerCanvas, setPickerCanvas] = useState('')
  const [coverUp, setCoverUp] = useState(false)

  const takePick = () =>
    html2canvas(document.body).then(canvas => {
      const croppedCanvas = document.createElement('canvas')
      const croppedCanvasContext = croppedCanvas.getContext('2d')

      const cropPositionTop = 0
      const cropPositionLeft = 0
      const cropWidth = window.innerWidth * 2
      const cropHeight = window.innerHeight * 2
      croppedCanvas.width = cropWidth
      croppedCanvas.height = cropHeight

      croppedCanvasContext.drawImage(canvas, cropPositionLeft, cropPositionTop)

      setPickerCanvas(croppedCanvasContext)
      setCoverUp(true)
    })

  const getEyeDrop = e => {
    e.stopPropagation()
    const x1 = e.clientX * 2
    const y1 = e.clientY * 2
    const [r, g, b] = pickerCanvas.getImageData(x1, y1, 1, 1).data
    onSelect(`rgba(${r}, ${g}, ${b}, 1)`)
    setCoverUp(false)
  }

  return (
    <div>
      <div
        style={{ ...buttonStyle, ...controlBtnStyles(coverUp) }}
        onClick={takePick}
      >
        <DropperIcon color={coverUp ? 'rgb(86, 140, 245)' : ''} />
      </div>
      {coverUp && (
        <Portal id="eyeDropCover">
          <div
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              zIndex: 100000000,
              width: window.innerWidth,
              height: window.innerHeight,
              cursor: 'copy',
            }}
            onClick={e => getEyeDrop(e)}
          />
        </Portal>
      )}
    </div>
  )
}

export default EyeDropper
