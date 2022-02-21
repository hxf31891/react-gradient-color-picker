import React, { useEffect } from "react"
import { config } from './constants'

const { squareSize, barSize } = config

const usePaintHue = canvas => {
  useEffect(() => {
    const ctx = canvas.current.getContext("2d")
    ctx.rect(0, 0, squareSize, barSize)

    const gradient = ctx.createLinearGradient(0, 0, squareSize, 0)
    for (let i = 0; i <= 360; i += 30) {
      gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`)
    }
    ctx.fillStyle = gradient
    ctx.fill()
  }, [canvas])
}

export default usePaintHue
