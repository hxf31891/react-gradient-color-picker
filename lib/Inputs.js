import React, { useState, useEffect, useRef } from 'react';
import { usePicker } from './context';
import { getRGBValues, getHue, getHex } from './utils';

var convert = require('color-convert');

const Inputs = () => {
  const [disable, setDisable] = useState('');
  const {
    currentColor,
    onChange,
    isGradient,
    opacity,
    handleGradient,
    handleChange
  } = usePicker();
  const hex = getHex(currentColor);
  const [newHex, setNewHex] = useState(hex);
  const rgba = getRGBValues(currentColor);
  useEffect(() => {
    if (disable !== 'hex') {
      setNewHex(getHex(currentColor));
    }
  }, [currentColor]);

  const handleHex = e => {
    let newRgba = convert.hex.rgb(e.target.value);
    setNewHex(e.target.value);
    let newColor = `rgba(${newRgba[0]}, ${newRgba[1]}, ${newRgba[2]}, ${opacity})`;
    handleChange(newColor);
  };

  const handleRgb = (value, type) => {
    let formatted = isNaN(value) ? 0 : value < 0 ? 0 : value > 255 ? 255 : value;
    let newValue = type === 'r' ? `rgba(${formatted}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})` : type === 'g' ? `rgba(${rgba[0]}, ${formatted}, ${rgba[2]}, ${rgba[3]})` : `rgba(${rgba[0]}, ${rgba[1]}, ${formatted}, ${rgba[3]})`;
    handleChange(newValue);
  };

  const handleO = value => {
    let formatted = isNaN(value) ? 0 : value < 0 ? 0 : value > 1 ? 1 : value;
    handleChange(`rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${formatted})`);
  };

  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 74
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "input-wrap",
    value: newHex,
    onChange: e => handleHex(e),
    onFocus: () => setDisable('hex'),
    onBlur: () => setDisable('')
  }), /*#__PURE__*/React.createElement("div", {
    className: "input-label"
  }, "HEX")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "input-wrap",
    value: rgba[0],
    onChange: e => handleRgb(parseFloat(e.target.value), 'r')
  }), /*#__PURE__*/React.createElement("div", {
    className: "input-label"
  }, "R")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "input-wrap",
    value: rgba[1],
    onChange: e => handleRgb(parseFloat(e.target.value), 'g')
  }), /*#__PURE__*/React.createElement("div", {
    className: "input-label"
  }, "G")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "input-wrap",
    value: rgba[2],
    onChange: e => handleRgb(parseFloat(e.target.value), 'b')
  }), /*#__PURE__*/React.createElement("div", {
    className: "input-label"
  }, "B")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "input-wrap",
    value: rgba[3],
    onChange: e => handleO(parseFloat(e.target.value))
  }), /*#__PURE__*/React.createElement("div", {
    className: "input-label"
  }, "A")));
};

export default Inputs; // <input style={{width: '25%', height: 34, borderRadius: 6, border: '1px solid grey', outline: 'none', textAlign: 'center'}} value={hex}/>