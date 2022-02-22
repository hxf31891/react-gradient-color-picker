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
   <a href="https://github.com/hxf31891/react-gradient-color-picker/blob/main/LICENSE">
    <img alt="" src="https://badgen.net/github/license/react-gradient-color-picker/react-gradient-color-picker?color=2c139f" />
  </a>
</div>

# react-best-gradient-color-picker
- Customizable, easy to use color and gradient picker for React.js
- Simply pass in an rgba or css gradient string as value and an onChange handler 
- UI will default to solid or gradient based on the value string it receives 
- You can customize the UI by hiding the various elements and updating value (see manual control below)
- You can also customize preset options by passing in an array of rgba colors (see custom presets below)

<br />
<div align="center">
  <img alt="" src="https://i.ibb.co/J553FGJ/demo.png" width="200px"/>
  <img alt="" src="https://i.ibb.co/ZdzKxCw/demo2.png" width="201px"/>
</div>
<br />

## Install
`npm install react-best-gradient-color-picker`

## Example 
```js
import React from 'react'
import ColorPicker from 'react-best-gradient-color-picker'

function MyApp() {
  const [color, setColor] = useState('rgba(255,255,255,1');

  return <ColorPicker value={color} onChange={setColor} />
}
```

### Props

| Name             | Type         | Default                 | Description                                                      |
| ---------------- | ------------ | ----------------------- | ---------------------------------------------------------------- |
| value            | `string`     | 'rgba(175, 51, 242, 1)' | The starting color                                               |
| hideInputs       | `boolean`    | `false`                 | (optional) hide the hex and rgba inputs                          |
| hideControls     | `boolean`    | `false`                 | (optional) hide the solid/gradient and gradient options          |
| hidePresets      | `boolean`    | `false`                 | (optional) hide the preset color options                         |
| presets          | `array`      | ['rgba(0,0,0,1)', ...]  | (optional) pass in custom preset options ['rgba()', 'rgba()', ..]|

### API

| Name             | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| onChange         | A function to update color value                                 |

### Manual Control - Customizing UI

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


## License

Code released under the [MIT](https://github.com/hxf31891/react-best-gradient-color-picker/blob/main/LICENSE) license.
