import { usePicker } from './context';
import { getRGBValues, getHue, getHex } from './utils';

var convert = require('color-convert');

const Inputs = () => {
  const {
    currentColor
  } = usePicker();
  const hex = getHex(currentColor);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 12
    }
  });
};

export default Inputs; // <input style={{width: '25%', height: 34, borderRadius: 6, border: '1px solid grey', outline: 'none', textAlign: 'center'}} value={hex}/>
// <input style={{width: '15%', height: 34, borderRadius: 6, border: '1px solid grey', outline: 'none', textAlign: 'center'}} value={rgbNums[0]}/>
// <input style={{width: '15%', height: 34, borderRadius: 6, border: '1px solid grey', outline: 'none', textAlign: 'center'}} value={rgbNums[1]}/>
// <input style={{width: '15%', height: 34, borderRadius: 6, border: '1px solid grey', outline: 'none', textAlign: 'center'}} value={rgbNums[2]}/>
// <input style={{width: '15%', height: 34, borderRadius: 6, border: '1px solid grey', outline: 'none', textAlign: 'center'}} value={rgbNums[3]}/>