import React, { useRef, useState } from 'react';
import { usePicker } from "./context";
import usePaintHue from './usePaintHue';

const Hue = () => {
  const barRef = useRef(null);
  const {
    handleHue,
    hue
  } = usePicker();
  const [dragging, setDragging] = useState(false);
  usePaintHue(barRef);

  const stopDragging = () => {
    setDragging(false);
  };

  const handleDown = () => {
    setDragging(true);
  };

  const handleMove = e => {
    if (dragging) {
      handleHue(e);
    }
  };

  const handleClick = e => {
    if (!dragging) {
      handleHue(e);
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "bar-wrap",
    onMouseEnter: stopDragging,
    onMouseLeave: stopDragging
  }, /*#__PURE__*/React.createElement("div", {
    className: "ps-rl bar-wrap-inner",
    onMouseUp: stopDragging
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-resize ps-rl",
    onMouseMove: e => handleMove(e)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      left: hue * .766666666666667,
      top: -.5
    },
    className: "handle",
    onMouseDown: handleDown
  }), /*#__PURE__*/React.createElement("canvas", {
    ref: barRef,
    width: "294px",
    height: "14px",
    style: {
      position: 'relative',
      borderRadius: 14
    },
    onClick: e => handleClick(e)
  }))));
};

export default Hue;