import React from 'react';
import { usePicker } from './context';
import { formatInputValues } from './formatters';
import { controlBtnStyles } from './Controls';
import TrashIcon, { LinearIcon, RadialIcon, DegreesIcon, StopIcon } from './icon';

const GradientControls = () => {
  const {
    gradientType
  } = usePicker();
  return /*#__PURE__*/React.createElement("div", {
    className: "df jsb",
    style: {
      marginTop: 12,
      marginBottom: -4,
      background: '#e9e9f5',
      borderRadius: 6
    }
  }, /*#__PURE__*/React.createElement(GradientType, null), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 53
    }
  }, gradientType === 'linear-gradient' && /*#__PURE__*/React.createElement(DegreePicker, null)), /*#__PURE__*/React.createElement(StopPicker, null), /*#__PURE__*/React.createElement(DeleteBtn, null));
};

export default GradientControls;

const GradientType = () => {
  const {
    gradientType,
    onChange,
    value
  } = usePicker();
  let isLinear = gradientType === 'linear-gradient';
  let isRadial = gradientType === 'radial-gradient';

  const handleLinear = () => {
    const remaining = value.split(/,(.+)/)[1];
    onChange(`linear-gradient(90deg, ${remaining}`);
  };

  const handleRadial = () => {
    const remaining = value.split(/,(.+)/)[1];
    onChange(`radial-gradient(circle, ${remaining}`);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "df ac control-btns-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "control-btn",
    onClick: handleLinear,
    style: { ...controlBtnStyles(isLinear)
    }
  }, /*#__PURE__*/React.createElement(LinearIcon, {
    color: isLinear ? '#568CF5' : ''
  })), /*#__PURE__*/React.createElement("div", {
    className: "control-btn",
    onClick: handleRadial,
    style: { ...controlBtnStyles(isRadial)
    }
  }, /*#__PURE__*/React.createElement(RadialIcon, {
    color: isRadial ? '#568CF5' : ''
  })));
};

const StopPicker = () => {
  const {
    currentLeft,
    handleGradient,
    currentColor
  } = usePicker();

  const handleMove = newVal => {
    handleGradient(currentColor, formatInputValues(newVal, 0, 100));
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "df ac control-btns-wrap",
    style: {
      paddingLeft: 8
    }
  }, /*#__PURE__*/React.createElement(StopIcon, null), /*#__PURE__*/React.createElement("input", {
    className: "degree-input",
    value: currentLeft,
    onChange: e => handleMove(e.target.value)
  }));
};

const DegreePicker = () => {
  const {
    degrees,
    onChange,
    value
  } = usePicker();

  const handleDegrees = e => {
    let newValue = formatInputValues(e.target.value, 0, 360);
    const remaining = value.split(/,(.+)/)[1];
    onChange(`linear-gradient(${newValue || 0}deg, ${remaining}`);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "ps-rl control-btns-wrap df ac"
  }, /*#__PURE__*/React.createElement(DegreesIcon, null), /*#__PURE__*/React.createElement("input", {
    className: "degree-input",
    value: degrees,
    onChange: e => handleDegrees(e)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: degrees > 99 ? 0 : degrees < 10 ? 7 : 3,
      top: 1,
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
    className: "df jc ac control-btns-wrap",
    style: {
      width: 30,
      ...controlBtnStyles(false),
      marginRight: 1
    }
  }, /*#__PURE__*/React.createElement(TrashIcon, null));
};