<div align="center">
  <a href="https://www.npmjs.com/package/react-best-gradient-color-picker">
    <img alt="npm" src="https://badgen.net/npm/v/react-best-gradient-color-picker?color=2c139f" />
  </a>
  <a href="https://www.npmjs.com/package/react-best-gradient-color-picker">
    <img alt="" src="https://badgen.net/npm/dt/react-best-gradient-color-picker?color=2c139f" />
  </a>
  <a href="https://bundlephobia.com/result?p=react-best-gradient-color-picker">
    <img alt="" src="https://badgen.net/bundlephobia/min/react-best-gradient-color-picker?color=2c139f" />
  </a>
</div>

# react-best-gradient-color-picker
- Customizable, easy to use color and gradient picker for React.js
- Simply pass in an rgba or css gradient string as value and an onChange handler 
- Variety of optional tools like eye dropper, advanced color settings, and color guide
- use the useColorPicker hook for complete control over of the picker
- You can completly customize the UI by hiding the included elements and using the hook to build your own
- You can also customize preset options by passing in an array of rgba colors (see custom presets below)

### Version 2.0.6 
- Fixes several bugs pertaining to hue slider when saturation is 0

### Version 2.0.8
- DefinitelyTyped

<br /> 

<img alt="" src="https://i.ibb.co/7yKnzdL/rbgcp2.png" width="100%" />

<br />


## Install
```
npm install react-best-gradient-color-picker
```

```
yarn add react-best-gradient-color-picker
```

## Demo
See the picker in action [here](https://gradient-package-demo.web.app/)

<br />

## Basic Example 
```js
import React from 'react'
import ColorPicker from 'react-best-gradient-color-picker'

function MyApp() {
  const [color, setColor] = useState('rgba(255,255,255,1)');

  return <ColorPicker value={color} onChange={setColor} />
}
```

<br />

### Props

| Name             | Type         | Default                 | Description                                                      |
| ---------------- | ------------ | ----------------------- | ---------------------------------------------------------------- |
| value            | `string`     | 'rgba(175, 51, 242, 1)' | The starting color                                               |
| hideInputs       | `boolean`    | `false`                 | (optional) hide the hex and rgba inputs                          |
| hideControls     | `boolean`    | `false`                 | (optional) hide the solid/gradient and gradient options          |
| hidePresets      | `boolean`    | `false`                 | (optional) hide the preset color options                         |
| hideEyeDrop      | `boolean`    | `false`                 | (optional) hide (and disable the eye dropper tool                |
| hideAdvancedSliders | `boolean` | `false`                 | (optional) hide the additional sliders (saturation, luminence, brightness|
| hideColorGuide   | `boolean`    | `false`                 | (optional) hide the color guide, a tool that shows color pairings|
| hideInputType    | `boolean`    | `false`                 | (optional) hide the input type selector, looking the type        |
| presets          | `array`      | ['rgba(0,0,0,1)', ...]  | (optional) pass in custom preset options ['rgba()', 'rgba()', ..]|

### API

| Name             | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| onChange         | A function to update color value                                 |

<br />

# useColorPicker 

- Take complete control of the picker
- Get current state
- Convert between color types

## Basic Example 

- Initialize the hook by passing in the same color value and onChange handler

```js
import React from 'react'
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'

function MyApp() {
  const [color, setColor] = useState('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)');
  const { setSolid, setGradient } = useColorPicker(color, setColor);

  return(
    <div>
      <button onClick={setSolid}>Solid</button>
      <button onClick={setGradient}>Gradient</button>
      <ColorPicker value={color} onChange={setColor} />
    </div>
   )
}
```

### Included Functions 

| Name             | Arguments        | Description                                                      |
| ---------------- | ---------------- | ---------------------------------------------------------------- |
| setLinear        |                  | Change the type of gradient to linear                            |
| setRadial        |                  | Change the type of gradient to radial                            |
| setDegrees       | degrees (num, 0 - 360)| Change the degrees of a linear gradient                     |
| setSolid         | (optional) new solid color (rgba string) | Change the pickers color mode from solid to gradient |
| setGradient      | (optional) new gradient (CSS gradient) | Change the pickers color mode from gradient to solid |
| setR             | value (num, 0 - 255) | Update the red value of the color                            |
| setG             | value (num, 0 - 255) | Update the green value of the color                          |
| setB             | value (num, 0 - 255) | Update the blue value of the color                           |
| setA             | value (num, 0 - 100) | Update the opacity (alpha) of a color                        |
| setHue           | value (num, 0 - 360) | Update the hue of a color                                    |
| setSaturation    | value (num, 0 - 100) | Update the saturation of a color                             |
| setLightness     | value (num, 0 - 100) | Update the lightness of a color                              |
| valueToHSL       |                  | Get the current value in HSL                                     |
| valueToHSV       |                  | Get the current value in HSV                                     |
| valueToHex       |                  | Get the current value in HEX                                     |
| valueToCmyk      |                  | Get the current value in CMYK                                    |
| setSelectedPoint | index of point (num) | Update which individual color of a gradient is in focus      |
| deletePoint      | index of point (num) | Delete one of the gradients colors                           |
| addPoint         | position of point (num, 0 - 100) | Add a new color to the gradient                  |
| setPointLeft     | value (num, 0 - 100) | Update the position (left) of the currently selected gradient color |

### Available State

| Name             | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| selectedPoint    | returns index of which color point of a gradient is currently selected |
| isGradient       | returns which mode the picker is in, solid or gradient           |
| gradientType     | which gradient type is currently selected, linear or radial      |
| degrees          | current degrees of a radial gradient                             |
| currentLeft      | the position of the selected gradient color                      |
| rgbaArr          | get the current rgba values in an array                          |
| hslArr           | get the current hsl values in an array                           |


## Various Customization Examples

### Custom Gradient Controls

```js
import React from 'react'
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'

function MyApp() {
  const [color, setColor] = useState('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)');
  const { gradientType, setLinear, setRadial, addPoint, deletePoint, degrees, setDegrees, setPointLeft, currentLeft, selectedPoint } = useColorPicker(color, setColor);

  return(
    <div>
      <button onClick={setLinear}>Linear</button>
      <button onClick={setRadial}>Radial</button>
      {gradientType === 'linear-gradient' && <input value={degrees} onChange={(e) => setDegrees(e.target.value)} />}
      <input value={currentLeft} onChange={(e) => setPointLeft(e.target.value)} />
      <button onClick={() => addPoint(50)}>Add Color</button>
      <button onClick={() => deletePoint(selectedPoint)}>Delete Color</button>
      <ColorPicker value={color} onChange={setColor} hideControls={true} />
    </div>
   )
}
```

### Custom RGBA Inputs

```js
import React from 'react'
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'

function MyApp() {
  const [color, setColor] = useState('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)');
  const { setR, setG, setB, setA, rgbaArr } = useColorPicker(color, setColor);

  return(
    <div>
      <input value={rgbaArr[0]} onChange={(e) => setR(e.target.value)} />
      <input value={rgbaArr[1]} onChange={(e) => setG(e.target.value)} />
      <input value={rgbaArr[2]} onChange={(e) => setB(e.target.value)} />
      <input value={rgbaArr[3]} onChange={(e) => setA(e.target.value)} />
      <ColorPicker value={color} onChange={setColor} hideInputs={true} />
    </div>
   )
}
```


### Conversions

```js
import React from 'react'
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'

function MyApp() {
  const [color, setColor] = useState('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)');
  const { valueToHSL, valueToHSV, valueToHex, valueToCmyk, rgbaArr, hslArr } = useColorPicker(color, setColor);

  const hslString = valueToHSL();
  const hsvString = valueToHSV();
  const hexString = valueToHex();
  const cmykString = valueToCmyk();
  const rgbaArray = rgbaArr;
  const hslArray = hslArr;

  return(
    <div>
      <ColorPicker value={color} onChange={setColor} />
    </div>
   )
}
```
<br />
## Custom Presets Example 

```js
import React from 'react'
import ColorPicker from 'react-best-gradient-color-picker'

const customPresets = [
  'rgba(34, 164, 65, 1)',
  'rgba(210, 18, 40, .5)',
  'rgba(90, 110, 232, 1)',
  'rgba(65, 89, 56, 1)',
  'rgba(98, 189, 243, 1)',
  'rgba(255, 210, 198, 1)',
  'rgba(94, 94, 94, 1)'
] //max 18 colors, you can pass in more but the array will be sliced to the first 18

function MyApp() {
  const [color, setColor] = useState('rgba(255,255,255,1');

  return <ColorPicker value={color} onChange={setColor} presets={customPresets} />
}
```

You may also want to provide the users recently used colors in lieu of preset options. This can be easily accomplished use the hook. 

```js
import React from 'react'
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'

function MyApp() {
  const [color, setColor] = useState('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)');
  const { previousColors } = useColorPicker(color, setColor);

  return(
    <div>
      <ColorPicker value={color} onChange={setColor} presets={previousColors} />
    </div>
   )
}
```

<br />

## LEGACY V1 - Manual Control - Customizing UI

This still works, although most functions are available through the useColorPicker hook, if there is something you need that is not available you could use the below methods to create your desired functionality.

The state of the picker is determined by parsing the value string. You can update props like colorType (solid/gradient), gradientType (linear/radial), gradientDegrees, hex, rgba, opacity and hue simply by updating the value you are passing into the component. Let's say you want to change the colorType from gradient to solid: 

```js
import React from 'react'
import ColorPicker from 'react-best-gradient-color-picker'

function MyApp() {
  const [color, setColor] = useState('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)');
  
  const setSolid = () => {
    setColor('rgba(255,255,255,1)') //color could be any rgba value
  }

  return(
    <div>
      <button onClick={setSolid}>Solid</button>
      <ColorPicker value={color} onChange={setColor} />
    </div>
   )
}
```
The same can be done in inverse to change colorType from solid to gradient:

```js  
  const setGradient = () => {
    setColor('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)')
  }
```

Example toggling gradientType 

```js  
  const setLinear = () => {
    setColor('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)')
  }
  
  const setRadial = () => {
    setColor('radial-gradient(circle, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)')
  }
```

Custom linear-gradient degrees input 

```js
import React from 'react'
import ColorPicker from 'react-best-gradient-color-picker'

function MyApp() {
  const [color, setColor] = useState('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)');
  const degrees = parseInt(value?.split(',')[0]?.split('(')[1])
  
  const handleDegrees = (val) => {
    let num = parseInt(val)
    let nans = isNaN(num) ? 0 : num
    let min = Math.max(nans, 0)
    let max = Math.min(min, 360)
    const remaining = value.split(/,(.+)/)[1]
    setColor(`linear-gradient(${max}deg, ${remaining}`)
  }

  return(
    <div>
      <input value={degrees} onChange={(e) => handleDegrees(e.target.value)} />
      <ColorPicker value={color} onChange={setColor} />
    </div>
   )
}
```


## License

Code released under the [MIT](https://github.com/hxf31891/react-best-gradient-color-picker/blob/main/LICENSE) license.
