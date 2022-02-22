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
   <a href="https://github.com/hxf31891/react-best-gradient-color-picker/blob/main/LICENSE">
    <img alt="" src="https://badgen.net/github/license/react-best-gradient-color-picker/react-best-gradient-color-picker?color=2c139f" />
  </a>
</div>

# react-best-gradient-color-picker
- Customizable, easy to use color and gradient picker for React.js
- Simply pass in an rgba or css gradient string as value and an onChange handler 
- UI will default to solid or gradient based on the value string it receives 
- You can customize the UI by hiding the various elements and using the API functions to build your own inputs, controls, etc.

<div align="center">
  <img alt="" src="https://github.com/hxf31891/react-gradient-color-picker/blob/main/demo/demo.png" width="200px"/>
  <img alt="" src="https://github.com/hxf31891/react-gradient-color-picker/blob/main/demo/demo2.png" width="201px"/>
</div>

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
| hidePresets      | `boolean`    | `false`                 | (optional) hide the preset color options                         |
| hideControls     | `boolean`    | `false`                 | (optional) hide the solid/gradient and gradient options          |

### API

| Name             | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| onChange         | A function to update color value                                 |

## License

Code released under the [MIT](https://github.com/hxf31891/react-best-gradient-color-picker/blob/main/LICENSE) license.
