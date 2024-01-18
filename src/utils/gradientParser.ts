import { high, low } from './formatters.js'
import { isUpperCase } from './utils.js'
import tinycolor from 'tinycolor2'

export const gradientParser = (input = '') => {
  const tokens = {
    linearGradient: /^(-(webkit|o|ms|moz)-)?(linear-gradient)/i,
    repeatingLinearGradient:
      /^(-(webkit|o|ms|moz)-)?(repeating-linear-gradient)/i,
    radialGradient: /^(-(webkit|o|ms|moz)-)?(radial-gradient)/i,
    repeatingRadialGradient:
      /^(-(webkit|o|ms|moz)-)?(repeating-radial-gradient)/i,
    sideOrCorner:
      /^to (left (top|bottom)|right (top|bottom)|top (left|right)|bottom (left|right)|left|right|top|bottom)/i,
    extentKeywords:
      /^(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)/,
    positionKeywords: /^(left|center|right|top|bottom)/i,
    pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,
    percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))%/,
    emValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,
    angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,
    startCall: /^\(/,
    endCall: /^\)/,
    comma: /^,/,
    hexColor: /^#([0-9a-fA-F]+)/,
    literalColor: /^([a-zA-Z]+)/,
    rgbColor: /^rgb/i,
    spacedRgbColor: /^(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s+\/\s+([0-1](\.\d+)?)/,
    rgbaColor: /^rgba/i,
    hslColor: /^hsl/i,
    hsvColor: /^hsv/i,
    number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/,
  }

  function error(msg: any) {
    const err = new Error(input + ': ' + msg)
    // err.source = input
    throw err
  }

  function consume(size: any) {
    input = input.substr(size)
  }

  function scan(regexp: any) {
    const blankCaptures = /^[\n\r\t\s]+/.exec(input)
    if (blankCaptures) {
      consume(blankCaptures[0].length)
    }

    const captures = regexp.exec(input)
    if (captures) {
      consume(captures[0].length)
    }

    return captures
  }

  function matchListing(matcher: any) {
    let captures = matcher()
    const result = []

    if (captures) {
      result.push(captures)
      while (scan(tokens.comma)) {
        captures = matcher()
        if (captures) {
          result.push(captures)
        } else {
          error('One extra comma')
        }
      }
    }

    return result
  }

  function match(type: any, pattern: any, captureIndex: any) {
    const captures = scan(pattern)
    if (captures) {
      return {
        type: type,
        value: captures[captureIndex],
      }
    }
  }

  function matchHexColor() {
    const hexObj = match('hex', tokens.hexColor, 1)
    if (hexObj?.value) {
      const { r, g, b, a } = tinycolor(hexObj?.value).toRgb()
      return {
        value: `rgba(${r}, ${g}, ${b}, ${a})`,
      }
    }
  }

  const checkCaps = (val: any) => {
    const capIt = isUpperCase(val?.[0])
    return {
      value: `${capIt ? 'RGBA' : 'rgba'}(${matchListing(matchNumber)})`,
    }
  }

  function matchCall(pattern: any, callback: any) {
    const captures = scan(pattern)

    if (captures) {
      if (!scan(tokens.startCall)) {
        error('Missing (')
      }

      const result = callback(captures)

      if (!scan(tokens.endCall)) {
        error('Missing )')
      }

      return result
    }
  }

  function matchHSLColor() {
    return matchCall(tokens.hslColor, convertHsl)
  }

  function matchRGBAColor() {
    return matchCall(tokens.rgbaColor, checkCaps)
  }

  function matchRGBColor() {
    return matchCall(tokens.rgbColor, convertRgb)
  }

  function matchLiteralColor() {
    const litObj = match('literal', tokens.literalColor, 0)
    if (litObj?.value) {
      const { r, g, b, a } = tinycolor(litObj?.value).toRgb()
      return {
        value: `rgba(${r}, ${g}, ${b}, ${a})`,
      }
    }
  }

  function matchHSVColor() {
    return matchCall(tokens.hsvColor, convertHsv)
  }

  function matchColor() {
    return (
      matchHexColor() ||
      matchHSLColor() ||
      matchRGBAColor() ||
      matchRGBColor() ||
      matchLiteralColor() ||
      matchHSVColor()
    )
  }

  function matchColorStop() {
    const color = matchColor()

    if (!color) {
      error('Expected color definition')
    }

    color.left = parseInt(matchDistance()?.value)
    return color
  }

  function matchGradient(
    gradientType: any,
    pattern: any,
    orientationMatcher: any
  ) {
    return matchCall(pattern, function () {
      const orientation = orientationMatcher()
      if (orientation) {
        if (!scan(tokens.comma)) {
          error('Missing comma before color stops')
        }
      }

      return {
        type: gradientType,
        orientation: orientation,
        colorStops: matchListing(matchColorStop),
      }
    })
  }

  function matchLinearOrientation() {
    return matchSideOrCorner() || matchAngle()
  }

  function matchDefinition() {
    return (
      matchGradient(
        'linear-gradient',
        tokens.linearGradient,
        matchLinearOrientation
      ) ||
      matchGradient(
        'repeating-linear-gradient',
        tokens.repeatingLinearGradient,
        matchLinearOrientation
      ) ||
      matchGradient(
        'radial-gradient',
        tokens.radialGradient,
        matchListRadialOrientations
      ) ||
      matchGradient(
        'repeating-radial-gradient',
        tokens.repeatingRadialGradient,
        matchListRadialOrientations
      )
    )
  }

  function matchListDefinitions() {
    return matchListing(matchDefinition)
  }

  function getAST() {
    const ast = matchListDefinitions()

    if (input.length > 0) {
      error('Invalid input not EOF')
    }

    const ast0 = ast[0]
    const checkSelected = ast0?.colorStops?.filter((c: any) =>
      isUpperCase(c.value)
    ).length

    const getGradientObj = () => {
      if (checkSelected > 0) {
        return ast0
      } else {
        const val = (c: any, i: number) => (i === 0 ? high(c) : low(c))
        return {
          ...ast0,
          colorStops: ast0.colorStops.map((c: any, i: number) => ({
            ...c,
            value: val(c, i),
          })),
        }
      }
    }

    return getGradientObj()
  }

  function matchSideOrCorner() {
    return match('directional', tokens.sideOrCorner, 1)
  }

  function matchAngle() {
    return match('angular', tokens.angleValue, 1)
  }

  function matchListRadialOrientations() {
    var radialOrientations,
      radialOrientation = matchRadialOrientation(),
      lookaheadCache

    if (radialOrientation) {
      radialOrientations = []
      radialOrientations.push(radialOrientation)

      lookaheadCache = input
      if (scan(tokens.comma)) {
        radialOrientation = matchRadialOrientation()
        if (radialOrientation) {
          radialOrientations.push(radialOrientation)
        } else {
          input = lookaheadCache
        }
      }
    }

    return radialOrientations
  }

  function matchRadialOrientation() {
    let radialType = matchCircle() || matchEllipse()

    if (radialType) {
      // @ts-expect-error - need to circle back for these types
      radialType.at = matchAtPosition()
    } else {
      const extent = matchExtentKeyword()
      if (extent) {
        radialType = extent
        const positionAt = matchAtPosition()
        if (positionAt) {
          // @ts-expect-error - need to circle back for these types
          radialType.at = positionAt
        }
      } else {
        const defaultPosition = matchPositioning()
        if (defaultPosition) {
          radialType = {
            type: 'default-radial',
            // @ts-expect-error - need to circle back for these types
            at: defaultPosition,
          }
        }
      }
    }

    return radialType
  }

  function matchLength() {
    return match('px', tokens.pixelValue, 1) || match('em', tokens.emValue, 1)
  }

  function matchCircle() {
    const circle = match('shape', /^(circle)/i, 0)

    if (circle) {
      // @ts-expect-error - need to circle back for these types
      circle.style = matchLength() || matchExtentKeyword()
    }

    return circle
  }

  function matchEllipse() {
    const ellipse = match('shape', /^(ellipse)/i, 0)

    if (ellipse) {
      // @ts-expect-error - need to circle back for these types
      ellipse.style = matchDistance() || matchExtentKeyword()
    }

    return ellipse
  }

  function matchExtentKeyword() {
    return match('extent-keyword', tokens.extentKeywords, 1)
  }

  function matchAtPosition() {
    if (match('position', /^at/, 0)) {
      const positioning = matchPositioning()

      if (!positioning) {
        error('Missing positioning value')
      }

      return positioning
    }
  }

  function matchPositioning() {
    const location = matchCoordinates()

    if (location.x || location.y) {
      return {
        type: 'position',
        value: location,
      }
    }
  }

  function matchCoordinates() {
    return {
      x: matchDistance(),
      y: matchDistance(),
    }
  }

  function matchNumber() {
    return scan(tokens.number)[1]
  }

  const convertHsl = (val: any) => {
    const capIt = isUpperCase(val?.[0])
    const hsl = matchListing(matchNumber)
    const { r, g, b, a } = tinycolor({
      h: hsl[0],
      s: hsl[1],
      l: hsl[2],
      a: hsl[3] || 1,
    }).toRgb()
    return {
      value: `${capIt ? 'RGBA' : 'rgba'}(${r}, ${g}, ${b}, ${a})`,
    }
  }

  const convertHsv = (val: any) => {
    const capIt = isUpperCase(val?.[0])
    const hsv = matchListing(matchNumber)
    const { r, g, b, a } = tinycolor({
      h: hsv[0],
      s: hsv[1],
      v: hsv[2],
      a: hsv[3] || 1,
    }).toRgb()
    return {
      value: `${capIt ? 'RGBA' : 'rgba'}(${r}, ${g}, ${b}, ${a})`,
    }
  }

  const convertRgb = (val: any) => {
    const capIt = isUpperCase(val?.[0])
    const captures = scan(tokens.spacedRgbColor)
    const [, r, g, b, a = 1] = captures || [null, ...matchListing(matchNumber)]
    return {
      value: `${capIt ? 'RGBA' : 'rgba'}(${r}, ${g}, ${b}, ${a})`,
    }
  }

  function matchDistance() {
    return (
      match('%', tokens.percentageValue, 1) ||
      matchPositionKeyword() ||
      matchLength()
    )
  }

  function matchPositionKeyword() {
    return match('position-keyword', tokens.positionKeywords, 1)
  }

  return getAST()
}
