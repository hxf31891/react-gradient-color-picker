import { config } from './constants';
const {
  squareSize,
  barSize,
  crossSize
} = config;
export const convertRGBtoHSL = rgb => {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
};
export const hsl2rgb = (h, s, l, alpha) => {
  let a = s * Math.min(l, 1 - l);

  let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  return `rgba(${f(0) * 255}, ${f(8) * 255}, ${f(4) * 255}, ${alpha})`;
};
export function computeBarPosition(e, offsetLeft) {
  let pos = e.clientX - offsetLeft - barSize / 2 - 1;
  return pos < -7 ? -7 : pos > 287 ? 287 : pos;
}
export function computeHue(x) {
  return Math.round((x + barSize / 2) * (360 / squareSize));
}
export function computeOpacity(x) {
  let o = Math.round(x / 2.80);
  return o < 0 ? 0 : o > 100 ? 100 : o;
}
export function computeHueX(h) {
  return Math.round(squareSize / 360 * h - barSize / 2);
}
export function computeSquareXY(s, l) {
  const t = s * (l < 50 ? l : 100 - l) / 100;
  const s1 = Math.round(200 * t / (l + t)) | 0;
  const b1 = Math.round(t + l);
  const x = squareSize / 100 * s1 - crossSize / 2;
  const y = squareSize - squareSize / 100 * b1 - crossSize / 2;
  return [x, y];
}
export function computePickerPosition(e, offsetLeft, offsetTop) {
  const getX = () => {
    let xPos = e.clientX - offsetLeft - crossSize / 2 - 1;
    return xPos < -8 ? -8 : xPos > 284 ? 284 : xPos;
  };

  const getY = () => {
    let yPos = e.clientY - offsetTop - crossSize / 2;
    return yPos < -8 ? -8 : yPos > 284 ? 284 : yPos;
  };

  return [getX(), getY()];
}
const defaultColor = `rgba(0, 255, 255, 1)`;
const defaultHue = 180;
const defaultHueX = squareSize / 2 - barSize / 2;
const defaultOpacity = 100;
const defaultOpacityX = 280;
const defaultSquare = [100, 50];
const defaultSquareXY = [squareSize - crossSize / 2, crossSize / -2];
export const getInitialValues = (colors, selectedColor) => {
  let s = colors[selectedColor];
  let hxd = 287 / 360;
  return {
    c: s?.value || defaultColor,
    h: s?.hsl[0] || defaultHue,
    hx: s?.hsl[0] ? computeHueX(s.hsl[0]) : defaultHueX,
    o: s?.opacity,
    ox: s?.opacity * 2.8,
    sq: s?.hsl ? [s?.hsl[1], s?.hsl[2]] : defaultSquare,
    sqxy: s?.hsl ? computeSquareXY(s?.hsl[1], s?.hsl[2]) : defaultSquareXY,
    gl: typeof s?.left === 'number' ? s?.left : 280
  };
};
export const getGradientType = value => {
  return value?.split(',')[0];
};