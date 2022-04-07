import React from 'react'
import { config } from './constants'
import styled from "styled-components"

const { squareSize } = config

export const PickerCanvas = styled.canvas.attrs(p => ({
  width: squareSize,
  height: squareSize
}))``

export const GradientBg = () => {
  return(
    <div className='opacity-bg'>
      {sqaures?.map((s, key) => (<div key={key} style={{height: 7, width: 7, background: s === 1 ? 'rgba(0,0,0,.3)' : ''}}/>))}
    </div>
  )
}

const sqaures = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
