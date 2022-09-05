import {isUpperCase, getNewHsl} from './utils'

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
    const callback = () => {};
    const output = getNewHsl(116, 79, 19, 0.5, callback)

    expect(output).toEqual('rgba(15, 87, 10, 0.5)')
  })

  it('should trigger callback with correct arguments', () => {
    const callback = jest.fn();
    getNewHsl(116, 79, 19, 0.5, callback)

    expect(callback).toHaveBeenCalledWith(116)
  })
})
