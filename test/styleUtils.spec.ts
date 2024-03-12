import { describe, expect, it } from 'vitest'
import { combineMultipleCssModules } from '../src/utils/styling.js'

describe('combineMultipleCssModules', () => {
  it('correctly combines multiple CSS modules', () => {
    const coreCss = {
      button: 'core-button',
      text: 'core-text',
    }

    const darkThemeCss = {
      button: 'dark-button',
      header: 'dark-header',
    }

    const additionalCss = {
      text: 'additional-text',
      footer: 'additional-footer',
    }

    const expected = {
      button: 'core-button dark-button',
      text: 'core-text additional-text',
      header: 'dark-header',
      footer: 'additional-footer',
    }

    const result = combineMultipleCssModules(
      coreCss,
      darkThemeCss,
      additionalCss
    )

    expect(result).toEqual(expected)
  })

  it('handles empty or undefined CSS modules gracefully', () => {
    const coreCss = {
      button: 'core-button',
    }

    const result = combineMultipleCssModules(coreCss, {})

    expect(result).toEqual(coreCss)
  })
})
