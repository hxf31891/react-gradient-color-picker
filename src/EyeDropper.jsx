import React, { useState } from 'react'
import Portal from 'robofox-react-portal';
import { usePicker } from './context'
import { DropperIcon } from './icon'
import html2canvas from 'html2canvas'
import { controlBtnStyles } from './Controls'

const EyeDropper = () => {
  const { handleChange } = usePicker();
  const [pickerCanvas, setPickerCanvas] = useState('')
  const [coverUp, setCoverUp] = useState(false)

  const takePick = () => html2canvas(document.body)
  .then((canvas) => {
    const croppedCanvas = document.createElement('canvas')
    const croppedCanvasContext = croppedCanvas.getContext('2d')

    const cropPositionTop = 0
    const cropPositionLeft = 0
    const cropWidth = window.innerWidth * 2
    const cropHeight = window.innerHeight * 2
    croppedCanvas.width = cropWidth
    croppedCanvas.height = cropHeight

    croppedCanvasContext.drawImage(
     canvas,
     cropPositionLeft,
     cropPositionTop,
   )

    setPickerCanvas(croppedCanvasContext)
    setCoverUp(true)
  })

  const getEyeDrop = (e) => {
    e.stopPropagation()
    const x1 = e.clientX * 2;
    const y1 = e.clientY * 2;
    const [r, g, b] = pickerCanvas.getImageData(x1, y1, 1, 1).data;
    handleChange(`rgba(${r}, ${g}, ${b}, 1)`)
    setCoverUp(false)
  }

  return(
    <div>
      <div style={{width: 30, ...controlBtnStyles(coverUp), height: 24, borderRadius: 4}} className='df jc ac' onClick={takePick}>
        <DropperIcon color={coverUp ? '#568CF5' : ''} />
      </div>
      {coverUp &&
        <Portal id="eyeDropCover">
          <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 100000000, width: window.innerWidth, height: window.innerHeight, cursor: 'copy' }} onClick={(e) => getEyeDrop(e)} />
        </Portal>
      }
    </div>
  )
}

export default EyeDropper;
