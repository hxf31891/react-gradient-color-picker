import React from 'react'
import { config } from './constants'
import styled from "styled-components"
import { useHandleStyle } from './useStyles'

const { squareSize } = config

export const Handle = ({type}) => {
  const { getHandleStyles } = useHandleStyle()

  return(
    <div style={getHandleStyles(type)} className='handle npe' />
  )
}

export const CanvasWrapper = ({ children, height }) => {
  return(
    <div style={{height: height}} className='canvas-wrapper'>
      {children}
    </div>
  )
}

export const BarCanvas = styled.canvas.attrs(p => ({
  width: squareSize,
}))``

export const PickerCanvas = styled.canvas.attrs(p => ({
  width: squareSize,
  height: squareSize
}))``

export const BarWrapper = ({children, reffy}) => {
  return(
    <div ref={reffy} className='bar-wrapper'>
      {children}
    </div>
  )
}

export const GradientBg = () => {
  return(
    <div className='opacity-bg'>
      {sqaures?.map((s, key) => (<div key={key} style={{height: 7, width: 7, background: s === 1 ? 'rgba(0,0,0,.3)' : ''}}/>))}
    </div>
  )
}

const sqaures = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
