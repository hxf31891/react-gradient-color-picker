export function rgb2cmyk(r, g, b) {
  var computedC = 0
  var computedM = 0
  var computedY = 0
  var computedK = 0

  if (
    r === null ||
    g === null ||
    b === null ||
    isNaN(r) ||
    isNaN(g) ||
    isNaN(b)
  ) {
    alert('Please enter numeric RGB values!')
    return
  }
  if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
    alert('RGB values must be in the range 0 to 255.')
    return
  }

  if (r === 0 && g === 0 && b === 0) {
    computedK = 1
    return [0, 0, 0, 1]
  }

  computedC = 1 - r / 255
  computedM = 1 - g / 255
  computedY = 1 - b / 255

  var minCMY = Math.min(computedC, Math.min(computedM, computedY))
  computedC = (computedC - minCMY) / (1 - minCMY)
  computedM = (computedM - minCMY) / (1 - minCMY)
  computedY = (computedY - minCMY) / (1 - minCMY)
  computedK = minCMY

  return { c: computedC, m: computedM, y: computedY, k: computedK }
}

export const cmykToRgb = ({ c, m, y, k }) => {
  var r = 255 * (1 - c) * (1 - k)
  var g = 255 * (1 - m) * (1 - k)
  var b = 255 * (1 - y) * (1 - k)

  return { r: r, g: g, b: b }
}
