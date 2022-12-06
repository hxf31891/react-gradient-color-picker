import { useEffect } from 'react'
var tinycolor = require('tinycolor2')

const usePaintHue = (canvas, squareSize) => {
  useEffect(() => {
    const ctx = canvas?.current?.getContext('2d', { willReadFrequently: true })
    ctx.rect(0, 0, squareSize, 14)

    const gradient = ctx.createLinearGradient(0, 0, squareSize, 0)
    for (let i = 0; i <= 360; i += 30) {
      gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`)
    }
    ctx.fillStyle = gradient
    ctx.fill()
  }, [canvas, squareSize])
}

export default usePaintHue

export const usePaintSat = (canvas, h, l, squareSize) => {
  useEffect(() => {
    const ctx = canvas?.current?.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.rect(0, 0, squareSize, 14)

      const gradient = ctx.createLinearGradient(0, 0, squareSize, 0)
      for (let i = 0; i <= 100; i += 10) {
        gradient.addColorStop(i / 100, `hsl(${h}, ${i}%, ${l}%)`)
      }
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }, [canvas, h, l, squareSize])
}

export const usePaintLight = (canvas, h, s, squareSize) => {
  useEffect(() => {
    const ctx = canvas?.current?.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.rect(0, 0, squareSize, 14)

      const gradient = ctx.createLinearGradient(0, 0, squareSize, 0)
      for (let i = 0; i <= 100; i += 10) {
        gradient.addColorStop(i / 100, `hsl(${h}, ${s}%, ${i}%)`)
      }
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }, [canvas, h, s, squareSize])
}

export const usePaintBright = (canvas, h, s, squareSize) => {
  useEffect(() => {
    const ctx = canvas?.current?.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.rect(0, 0, squareSize, 14)

      const gradient = ctx.createLinearGradient(0, 0, squareSize, 0)
      for (let i = 0; i <= 100; i += 10) {
        let hsl = tinycolor({ h: h, s: s, v: i })
        gradient.addColorStop(i / 100, hsl.toHslString())
      }
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }, [canvas, h, s, squareSize])
}
