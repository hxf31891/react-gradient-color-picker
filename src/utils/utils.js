import { formatInputValues } from "./formatters";
import { config } from "../constants";
var tc = require("tinycolor2");

const { barSize, crossSize } = config;

export function getHandleValue(e) {
  const { offsetLeft, clientWidth } = safeBounds(e);
  let pos = e.clientX - offsetLeft - barSize / 2;
  let adjuster = clientWidth - 18;
  let bounded = formatInputValues(pos, 0, adjuster);
  return Math.round(bounded / (adjuster / 100));
}

export function computeSquareXY(
  hsl,
  squareSize,
  squareHeight,
) {
  const s = hsl[1] * 100;
  const l = hsl[2] * 100;
  const t = (s * (l < 50 ? l : 100 - l)) / 100;
  const s1 = Math.round((200 * t) / (l + t)) | 0;
  const b1 = Math.round(t + l);
  const x = (squareSize / 100) * s1 - crossSize / 2;
  const y = squareHeight - (squareHeight / 100) * b1 - crossSize / 2;
  return [x, y];
}

export function computePickerPosition(e) {
  const { offsetLeft, offsetTop, clientWidth, clientHeight } = safeBounds(e);
  const { clientX, clientY } = getClientXY(e);
  const getX = () => {
    let xPos = clientX - offsetLeft - crossSize / 2;
    return formatInputValues(xPos, -9, clientWidth - 10);
  };
  const getY = () => {
    let yPos = clientY - offsetTop - crossSize / 2;
    return formatInputValues(yPos, -9, clientHeight - 10);
  };

  return [getX(), getY()];
}

const getClientXY = (e) => {
  if (e.clientX) {
    return { clientX: e.clientX, clientY: e.clientY }
  } else {
    let touch = e.touches[0] || {}
    return { clientX: touch.clientX, clientY: touch.clientY }
  }
}

export const getGradientType = (value) => {
  return value?.split("(")[0];
};

export const getNewHsl = (newHue, s, l, o, setInternalHue) => {
  setInternalHue(newHue);
  let tiny = tc({ h: newHue, s: s, l: l });
  let { r, g, b } = tiny.toRgb();
  return `rgba(${r}, ${g}, ${b}, ${o})`;
};

export const safeBounds = (e) => {
  let client = e.target.parentNode.getBoundingClientRect();
  let className = e.target.className;
  let adjuster = className === "c-resize ps-rl" ? 15 : 0;
  return {
    offsetLeft: client?.x + adjuster,
    offsetTop: client?.y,
    clientWidth: client?.width,
    clientHeight: client?.height,
  };
};

export const isUpperCase = (str) => {
  return str?.[0] === str?.[0]?.toUpperCase();
};

export const compareGradients = (g1, g2) => {
  let ng1 = g1?.toLowerCase()?.replaceAll(" ", "");
  let ng2 = g2?.toLowerCase()?.replaceAll(" ", "");

  if (ng1 === ng2) {
    return true;
  } else {
    return false;
  }
};

const convertShortHandDeg = (dir) => {
  if (dir === "to top") {
    return 0
  } else if (dir === "to bottom") {
    return 180
  } else if (dir === "to left") {
    return 270
  } else if (dir === "to right") {
    return 90
  } else if (dir === "to top right") {
    return 45
  } else if (dir === "to bottom right") {
    return 135
  } else if (dir === "to bottom left") {
    return 225
  } else if (dir === "to top left") {
    return 315
  } else {
    let safeDir = dir || 0
    return parseInt(safeDir);
  }
}

export const getDegrees = (value) => {
  let s1 = value?.split(",")[0];
  let s2 = s1?.split("(")[1]?.replace("deg", "");
  return convertShortHandDeg(s2)
};

export const objectToString = (value) => {
  if (typeof value === 'string') {
    return value
  } else {
    if (value?.type?.includes("gradient")) {
      let sorted = value?.colorStops?.sort((a, b) => a?.left - b?.left);
      let string = sorted?.map((c) => `${c?.value} ${c?.left}%`)?.join(", ");
      let type = value?.type;
      let degs = convertShortHandDeg(value?.orientation?.value);
      let gradientStr = type === 'linear-gradient' ? `${degs}deg` : 'circle';
      return `${type}(${gradientStr}, ${string})`
    } else {
      let color = value?.colorStops[0]?.value || 'rgba(175, 51, 242, 1)';
      return color;
    }
  }
}
