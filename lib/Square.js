import React, { useRef, useEffect } from "react";
import throttle from "lodash.throttle";
import usePaintSquare from "./usePaintSquare";
import { usePicker } from './context';
import { PickerCanvas, CanvasWrapper } from './components';

const Square = () => {
  const {
    handleColor,
    offsetLeft,
    x,
    y,
    hue
  } = usePicker();
  const square = useRef(null);
  const canvas = useRef(null);
  usePaintSquare(canvas, hue);
  useEffect(() => {
    const canvasRef = canvas.current;
    const squareRef = square.current;
    const ctx = canvasRef.getContext("2d");
    const onMouseMove = throttle(e => {
      handleColor(e, ctx);
    }, 150);

    function onMouseUp(e) {
      handleColor(e, ctx);
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    }

    function onMouseDown(e) {
      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp);
    }

    canvasRef.addEventListener("mousedown", onMouseDown);
    squareRef.addEventListener("mousedown", onMouseDown);
    return () => {
      canvasRef.removeEventListener("mousedown", onMouseDown);
      squareRef.removeEventListener("mousedown", onMouseDown);
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    };
  }, [handleColor, offsetLeft]);
  return /*#__PURE__*/React.createElement("div", {
    ref: square,
    className: "ps-rl c-cross",
    style: {
      height: 294,
      width: 294
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      left: x,
      top: y
    },
    className: "handle npe"
  }), /*#__PURE__*/React.createElement("div", {
    className: "canvas-wrapper"
  }, /*#__PURE__*/React.createElement(PickerCanvas, {
    ref: canvas
  })));
};

export default Square;