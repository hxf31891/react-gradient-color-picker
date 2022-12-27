import { gradientParser } from '../src/utils/gradientParser'

describe('gradientParser', () => {
  it('should parse linear gradient with hex colors', () => {
    const gradient = 'linear-gradient(45deg, #012345 0%, #6789AB 100%)'

    expect(gradientParser(gradient)).toEqual({
      colorStops: [
        { left: 0, type: 'hex', value: '012345' },
        { left: 100, type: 'hex', value: '6789AB' },
      ],
      orientation: { type: 'angular', value: '45' },
      type: 'linear-gradient',
    })
  })

  it('should parse linear gradient with comma-separated rgba colors', () => {
    const gradient =
      'linear-gradient(45deg, rgba(1, 2, 3, 0.123) 0%, rgba(4, 5, 6, 0.456) 100%)'

    expect(gradientParser(gradient)).toEqual({
      colorStops: [
        { left: 0, value: 'RGBA(1,2,3,0.123)' },
        { left: 100, value: 'rgba(4,5,6,0.456)' },
      ],
      orientation: { type: 'angular', value: '45' },
      type: 'linear-gradient',
    })
  })

  it('should parse linear gradient with rgb + alpha colors', () => {
    const gradient =
      'linear-gradient(45deg, rgb(1 2 3 / 0.123) 0%, rgb(4 5 6 / 0.456) 100%)'

    expect(gradientParser(gradient)).toEqual({
      colorStops: [
        { left: 0, value: 'RGBA(1, 2, 3, 0.123)' },
        { left: 100, value: 'rgba(4, 5, 6, 0.456)' },
      ],
      orientation: { type: 'angular', value: '45' },
      type: 'linear-gradient',
    })
  })

  it('should parse linear gradient with comma-separated rgb colors', () => {
    const gradient =
      'linear-gradient(45deg, rgb(1, 2, 3) 0%, rgb(4, 5, 6) 100%)'

    expect(gradientParser(gradient)).toEqual({
      colorStops: [
        { left: 0, value: 'RGBA(1, 2, 3, 1)' },
        { left: 100, value: 'rgba(4, 5, 6, 1)' },
      ],
      orientation: { type: 'angular', value: '45' },
      type: 'linear-gradient',
    })
  })

  // TODO: Figure out pattern of "HSV" colors

  // TODO: Make it accept percentages
  // it('should parse linear gradient with hsl colors', () => {
  //   const gradient = 'linear-gradient(45deg, hsl(0, 100%, 50%) 0%, hsl(100, 50%, 85%) 100%)'
  //
  //   expect(gradientParser(gradient)).toEqual({})
  // })
})
