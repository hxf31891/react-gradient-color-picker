import {
  isUpperCase,
  getNewHsl,
  getGradientType,
  getDegrees,
} from '../src/utils/utils'

describe('isUpperCase', () => {
  it('should return true when the first letter of the string is upper-cased', () => {
    expect(isUpperCase('Aloha oe')).toBe(true)
  })

  it('should return false when the first letter of the string is lower-cased', () => {
    expect(isUpperCase('aLOHA OE')).toBe(false)
  })
})

describe('getNewHsl', () => {
  it('should return correct RGBA color for given HSL color', () => {
    const callback = () => {}
    const output = getNewHsl(116, 79, 19, 0.5, callback)

    expect(output).toEqual('rgba(15, 87, 10, 0.5)')
  })

  it('should trigger callback with correct arguments', () => {
    const callback = jest.fn()
    getNewHsl(116, 79, 19, 0.5, callback)

    expect(callback).toHaveBeenCalledWith(116)
  })
})

describe('getGradientType', () => {
  it('should pick the correct prefix of gradient values', () => {
    const assertionMap = [
      ['linear-gradient(30deg, #6789AB 0%, #012345 100%)', 'linear-gradient'],
      [
        '-webkit-linear-gradient(30deg, #6789AB 0%, #012345 100%)',
        '-webkit-linear-gradient',
      ],
      [
        '-o-linear-gradient(30deg, #6789AB 0%, #012345 100%)',
        '-o-linear-gradient',
      ],
      [
        '-ms-linear-gradient(30deg, #6789AB 0%, #012345 100%)',
        '-ms-linear-gradient',
      ],
      [
        '-moz-linear-gradient(30deg, #6789AB 0%, #012345 100%)',
        '-moz-linear-gradient',
      ],

      [
        'repeating-linear-gradient(30deg, #6789AB 0%, #012345 100%)',
        'repeating-linear-gradient',
      ],
      [
        '-webkit-repeating-linear-gradient(30deg, #6789AB 0%, #012345 100%)',
        '-webkit-repeating-linear-gradient',
      ],
      [
        '-o-repeating-linear-gradient(30deg, #6789AB 0%, #012345 100%)',
        '-o-repeating-linear-gradient',
      ],
      [
        '-ms-repeating-linear-gradient(30deg, #6789AB 0%, #012345 100%)',
        '-ms-repeating-linear-gradient',
      ],
      [
        '-moz-repeating-linear-gradient(30deg, #6789AB 0%, #012345 100%)',
        '-moz-repeating-linear-gradient',
      ],

      ['radial-gradient(#6789AB 0%, #012345 100%)', 'radial-gradient'],
      [
        '-webkit-radial-gradient(#6789AB 0%, #012345 100%)',
        '-webkit-radial-gradient',
      ],
      ['-o-radial-gradient(#6789AB 0%, #012345 100%)', '-o-radial-gradient'],
      ['-ms-radial-gradient(#6789AB 0%, #012345 100%)', '-ms-radial-gradient'],
      [
        '-moz-radial-gradient(#6789AB 0%, #012345 100%)',
        '-moz-radial-gradient',
      ],

      [
        'repeating-radial-gradient(#6789AB 0%, #012345 100%)',
        'repeating-radial-gradient',
      ],
      [
        '-webkit-repeating-radial-gradient(#6789AB 0%, #012345 100%)',
        '-webkit-repeating-radial-gradient',
      ],
      [
        '-o-repeating-radial-gradient(#6789AB 0%, #012345 100%)',
        '-o-repeating-radial-gradient',
      ],
      [
        '-ms-repeating-radial-gradient(#6789AB 0%, #012345 100%)',
        '-ms-repeating-radial-gradient',
      ],
      [
        '-moz-repeating-radial-gradient(#6789AB 0%, #012345 100%)',
        '-moz-repeating-radial-gradient',
      ],
    ]
    const outputs = []
    const expected = []

    assertionMap.forEach(([value, expectedValue]) => {
      outputs.push(getGradientType(value))
      expected.push(expectedValue)
    })

    expect(outputs).toEqual(expected)
  })
})

describe('getDegrees', () => {
  it('should pick the correct degree from linear gradient values', () => {
    const assertionMap = [
      ['linear-gradient(0deg, #6789AB 0%, #012345 100%)', 0],
      ['-webkit-linear-gradient(1deg, #6789AB 0%, #012345 100%)', 1],
      ['-o-linear-gradient(2deg, #6789AB 0%, #012345 100%)', 2],
      ['-ms-linear-gradient(3deg, #6789AB 0%, #012345 100%)', 3],
      ['-moz-linear-gradient(4deg, #6789AB 0%, #012345 100%)', 4],

      ['repeating-linear-gradient(5deg, #6789AB 0%, #012345 100%)', 5],
      ['-webkit-repeating-linear-gradient(6deg, #6789AB 0%, #012345 100%)', 6],
      ['-o-repeating-linear-gradient(7deg, #6789AB 0%, #012345 100%)', 7],
      ['-ms-repeating-linear-gradient(8deg, #6789AB 0%, #012345 100%)', 8],
      ['-moz-repeating-linear-gradient(9deg, #6789AB 0%, #012345 100%)', 9],
    ]
    const outputs = []
    const expected = []

    assertionMap.forEach(([value, expectedValue]) => {
      outputs.push(getDegrees(value))
      expected.push(expectedValue)
    })

    expect(outputs).toEqual(expected)
  })
})
