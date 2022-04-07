import React from 'react';
import { config } from './constants';
import styled from "styled-components";
const {
  squareSize
} = config;
export const PickerCanvas = styled.canvas.attrs(p => ({
  width: squareSize,
  height: squareSize
}))``;
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