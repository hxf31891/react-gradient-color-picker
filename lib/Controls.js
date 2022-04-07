import React from 'react';
import TrashIcon, { LinearIcon, RadialIcon, MenuIcon } from './icon';
import { usePicker } from './context';

const Controls = () => {
  const {
    isGradient,
    onChange,
    gradientType,
    setSelectedColor,
    colors
  } = usePicker();
  const isLinear = gradientType === 'linear-gradient';

  const setSolid = () => {
    setSelectedColor(0);
    onChange('rgba(175, 51, 242, 1)');
  };

  const setGradient = () => {
    onChange('linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)');
  };

  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 12,
      paddingBottom: 9,
      overflow: 'hidden'
    },
    className: "df jsb"
  }, /*#__PURE__*/React.createElement("div", {
    className: "df jsb ac",
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "df jc ac",
    style: {
      height: 28,
      background: '#e9e9f5',
      borderRadius: 6,
      padding: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: controlBtnStyles(!isGradient),
    className: "control-btn df ac",
    onClick: setSolid
  }, "Solid"), /*#__PURE__*/React.createElement("div", {
    style: controlBtnStyles(isGradient),
    className: "control-btn df ac",
    onClick: setGradient
  }, "Gradient")), /*#__PURE__*/React.createElement("div", {
    className: "df ac jfe",
    style: {
      height: 28,
      background: '#e9e9f5',
      borderRadius: 6,
      padding: 2
    }
  }, isLinear && isGradient && /*#__PURE__*/React.createElement(DegreePicker, null), isGradient && /*#__PURE__*/React.createElement(GradientType, null), isGradient && colors.length > 2 && /*#__PURE__*/React.createElement(DeleteBtn, null), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24
    },
    className: "df jc"
  }, /*#__PURE__*/React.createElement(MenuIcon, null)))));
};

export default Controls;

const GradientType = () => {
  const {
    gradientType,
    onChange,
    value
  } = usePicker();

  const handleLinear = () => {
    const remaining = value.split(/,(.+)/)[1];
    onChange(`linear-gradient(90deg, ${remaining}`);
  };

  const handleRadial = () => {
    const remaining = value.split(/,(.+)/)[1];
    onChange(`radial-gradient(circle, ${remaining}`);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "df ac",
    style: {
      marginRight: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "control-grad-wrap",
    onClick: handleLinear,
    style: {
      marginRight: 1,
      ...gradBtnStyles(gradientType === 'linear-gradient')
    }
  }, /*#__PURE__*/React.createElement(LinearIcon, null)), /*#__PURE__*/React.createElement("div", {
    className: "control-grad-wrap",
    onClick: handleRadial,
    style: {
      marginLeft: 1,
      ...gradBtnStyles(gradientType === 'radial-gradient')
    }
  }, /*#__PURE__*/React.createElement(RadialIcon, null)));
};

const DegreePicker = () => {
  const {
    degrees,
    value,
    onChange
  } = usePicker();

  const handleDegrees = e => {
    let num = parseInt(e.target.value);
    let nans = isNaN(num) ? 0 : num;
    let min = Math.max(nans, 0);
    let max = Math.min(min, 360);
    const remaining = value.split(/,(.+)/)[1];
    onChange(`linear-gradient(${max}deg, ${remaining}`);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "ps-rl",
    style: {
      marginRight: 14
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "degree-input",
    value: degrees,
    onChange: e => handleDegrees(e)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: degrees > 99 ? 0 : 3,
      top: -1,
      fontWeight: 400,
      fontSize: 13
    }
  }, "\xB0"));
};

const DeleteBtn = () => {
  const {
    deletePoint
  } = usePicker();
  return /*#__PURE__*/React.createElement("div", {
    onClick: deletePoint,
    className: "delete-point-btn df jc ac"
  }, /*#__PURE__*/React.createElement(TrashIcon, null));
};

const gradBtnStyles = selected => {
  return {
    background: selected ? 'white' : '',
    boxShadow: selected ? '1px 1px 6px rgba(0,0,0,.15)' : ''
  };
};

const controlBtnStyles = selected => {
  return {
    background: selected ? 'white' : '',
    color: selected ? '#568CF5' : '',
    boxShadow: selected ? '0px 0px 8px rgba(0,0,0,.125)' : ''
  };
};