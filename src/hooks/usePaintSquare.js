import { useEffect } from 'react'

const usePaintSquare = (canvas, hue, squareSize, squareHeight) => {
  useEffect(() => {
    const ctx = canvas.current.getContext('2d', { willReadFrequently: true })
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
    ctx.fillRect(0, 0, squareSize, squareHeight)
    const gradientWhite = ctx.createLinearGradient(0, 0, squareSize, 0)
    gradientWhite.addColorStop(0, `rgba(255, 255, 255, 1)`)
    gradientWhite.addColorStop(1, `rgba(255, 255, 255, 0)`)
    ctx.fillStyle = gradientWhite
    ctx.fillRect(0, 0, squareSize, squareHeight)
    const gradientBlack = ctx.createLinearGradient(0, 0, 0, squareHeight)
    gradientBlack.addColorStop(0, `rgba(0, 0, 0, 0)`)
    gradientBlack.addColorStop(1, `rgba(0, 0, 0, 1)`)
    ctx.fillStyle = gradientBlack
    ctx.fillRect(0, 0, squareSize, squareHeight)
  }, [canvas, hue, squareSize, squareHeight])
}

export default usePaintSquare
