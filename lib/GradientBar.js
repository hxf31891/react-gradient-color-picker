import React, { useRef, useEffect, useState } from "react";
import { getHandleValue } from './utils';
import { usePicker } from "./context";

const GradientBar = ({}) => {
  const {
    currentColor,
    addPoint,
    colors,
    value,
    handleGradient,
    offsetLeft
  } = usePicker();
  const [dragging, setDragging] = useState(false);

  const stopDragging = () => {
    setDragging(false);
  };

  const handleDown = e => {
    if (!dragging) {
      addPoint(e);
    }
  };

  const handleUp = e => {
    if (dragging) {
      e.stopPropagation();
      handleGradient(currentColor, getHandleValue(e, offsetLeft));
      stopDragging();
    }
  };

  const handleMove = e => {
    if (dragging) {
      handleGradient(currentColor, getHandleValue(e, offsetLeft));
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "bar-wrap",
    onMouseEnter: stopDragging,
    onMouseLeave: stopDragging
  }, /*#__PURE__*/React.createElement("div", {
    className: "ps-rl bar-wrap-inner",
    onMouseUp: e => handleUp(e)
  }, /*#__PURE__*/React.createElement("div", {
    onMouseDown: e => handleDown(e),
    onMouseMove: e => handleMove(e),
    style: {
      paddingTop: 6,
      paddingBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 294,
      height: 14,
      backgroundImage: value,
      borderRadius: 10
    }
  })), colors?.map((c, i) => /*#__PURE__*/React.createElement(Handle, {
    left: c.left,
    key: `${i}-${c}`,
    i: i,
    setDragging: setDragging
  }))));
};

export default GradientBar;
export const Handle = ({
  left,
  i,
  setDragging
}) => {
  const {
    setSelectedColor,
    offsetLeft,
    selectedColor
  } = usePicker();
  const isSelected = selectedColor === i;

  const handleDown = e => {
    e.stopPropagation();
    setSelectedColor(i);
    setDragging(true);
  };

  return /*#__PURE__*/React.createElement("div", {
    style: {
      left: left * 2.76 + 13
    },
    onMouseDown: e => handleDown(e),
    className: "gradient-handle-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: handleStyle(isSelected),
    className: "gradient-handle"
  }));
};

const handleStyle = isSelected => {
  return {
    boxShadow: isSelected ? '0px 0px 5px 1px rgba(86, 140, 245,.95)' : '',
    border: isSelected ? '2px solid white' : '2px solid rgba(255,255,255,.75)'
  };
};