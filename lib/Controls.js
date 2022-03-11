import React from 'react';
import TrashIcon from './icon';
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
      paddingBottom: 2
    },
    className: "df jsb"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "25%"
    }
  }, isGradient && /*#__PURE__*/React.createElement(GradientType, null)), /*#__PURE__*/React.createElement("div", {
    className: "control-btn-wrap df"
  }, /*#__PURE__*/React.createElement("div", {
    style: controlBtnStyles(!isGradient),
    className: "control-btn df ac",
    onClick: setSolid
  }, "Solid"), /*#__PURE__*/React.createElement("div", {
    style: controlBtnStyles(isGradient),
    className: "control-btn df ac",
    onClick: setGradient
  }, "Gradient")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "25%"
    },
    className: "df jfe ac"
  }, isGradient && colors.length > 2 && /*#__PURE__*/React.createElement(DeleteBtn, null), isLinear && isGradient && /*#__PURE__*/React.createElement(DegreePicker, null)));
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
    className: "control-grad-type df"
  }, /*#__PURE__*/React.createElement("div", {
    className: "control-grad-btn-wrap",
    style: {
      boxShadow: gradientType === 'linear-gradient' ? '0px 0px 2px 1px #568CF5' : '0px 0px 1px 1px #8c8c8f'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "control-grad-btn control-grad-1",
    onClick: handleLinear
  })), /*#__PURE__*/React.createElement("div", {
    className: "control-grad-btn-wrap",
    style: {
      boxShadow: gradientType === 'radial-gradient' ? '0px 0px 2px 1px #568CF5' : '0px 0px 1px 1px #8c8c8f'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "control-grad-btn control-grad-2",
    onClick: handleRadial
  })));
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
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "input-wrap",
    style: {
      marginLeft: 8,
      width: 44
    },
    value: degrees,
    onChange: e => handleDegrees(e)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 4,
      top: 0,
      fontWeight: 400
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

const controlBtnStyles = selected => {
  return {
    background: selected ? '#568CF5' : 'white',
    color: selected ? 'white' : ''
  };
};