import React, { useRef, useState } from "react";
import throttle from "lodash.throttle";
import usePaintSquare from "./usePaintSquare";
import { usePicker } from "./context";

const Square = () => {
  const {
    handleColor,
    x,
    y,
    internalHue
  } = usePicker();
  const [dragging, setDragging] = useState(false);
  const canvas = useRef(null);
  usePaintSquare(canvas, internalHue);

  const handleChange = e => {
    const ctx = canvas?.current?.getContext("2d");
    const onMouseMove = throttle(() => handleColor(e, ctx), 250);
    onMouseMove();
  };

  const stopDragging = () => {
    setDragging(false);
  };

  const handleMove = e => {
    if (dragging) {
      handleChange(e);
    }
  };

  const handleClick = e => {
    if (!dragging) {
      handleChange(e);
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "ps-rl"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -7,
      top: -7,
      width: 308,
      height: 308
    },
    onMouseEnter: stopDragging
  }), /*#__PURE__*/React.createElement("div", {
    className: "ps-rl c-cross",
    onMouseMove: e => handleMove(e),
    onMouseUp: stopDragging
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      left: x,
      top: y
    },
    className: "handle",
    onMouseDown: () => setDragging(true)
  }), /*#__PURE__*/React.createElement("div", {
    className: "canvas-wrapper",
    onClick: e => handleClick(e)
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvas,
    width: "294px",
    height: "294px"
  }))));
};

export default Square;