import {isUpperCase} from './utils'

describe('isUpperCase', () => {
  it('should return true when the first letter of the string is upper-cased', () => {
    expect(isUpperCase('Aloha oe')).toBe(true)
  })

  it('should return false when the first letter of the string is lower-cased', () => {
    expect(isUpperCase('aLOHA OE')).toBe(false)
  })
})
