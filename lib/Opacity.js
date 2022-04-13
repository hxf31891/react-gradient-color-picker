import React, { useState } from "react";
import { usePicker } from './context';

const Opacity = () => {
  const {
    handleOpacity,
    opacity,
    tinyColor
  } = usePicker();
  const [dragging, setDragging] = useState(false);
  const {
    r,
    g,
    b
  } = tinyColor.toRgb();
  const bg = `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(${r},${g},${b},.5) 100%)`;

  const stopDragging = () => {
    setDragging(false);
  };

  const handleDown = () => {
    setDragging(true);
  };

  const handleMove = e => {
    if (dragging) {
      handleOpacity(e);
    }
  };

  const handleClick = e => {
    if (!dragging) {
      handleOpacity(e);
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "bar-wrap",
    onMouseEnter: stopDragging,
    onMouseLeave: stopDragging,
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bar-wrap-inner",
    onMouseUp: stopDragging
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-resize ps-rl",
    onMouseDown: handleDown,
    onMouseMove: e => handleMove(e)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      left: 276 * opacity,
      top: -2
    },
    className: "handle"
  }), /*#__PURE__*/React.createElement("div", {
    className: "opacity-overlay",
    style: {
      background: bg
    },
    onClick: e => handleClick(e)
  }), /*#__PURE__*/React.createElement(OpacityBg, null))));
};

export default Opacity;

const OpacityBg = () => {
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