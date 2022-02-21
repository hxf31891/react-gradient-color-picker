import { usePicker } from './context';
import { getHue, getHex, getRGBValues } from './utils';
export const useColor = () => {
  const {
    currentColor
  } = usePicker();
  const hue = getHue(currentColor);
  const hex = getHex(currentColor);
  const rgb = getRGBValues(currentColor);
  return {
    hue,
    hex,
    rgb
  };
};