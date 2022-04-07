import React from 'react';
export const GradientBg = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "opacity-bg"
  }, sqaures?.map((s, key) => /*#__PURE__*/React.createElement("div", {
    key: key,
    style: {
      height: 7,
      width: 7,
      background: s === 1 ? 'rgba(0,0,0,.3)' : ''
    }
  })));
};
const sqaures = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];