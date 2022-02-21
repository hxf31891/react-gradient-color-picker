import { usePicker } from './context';
import { computeHueX } from './utils';
export const useHandleStyle = () => {
  const {
    hue,
    opacity,
    x,
    y
  } = usePicker();
  const hueX = computeHueX(hue);
  const opacityX = opacity * 280;
  const backgrounds = {
    hue: `hsla(${hue}, 100%, 50%, 1)`,
    opacity: 'transparent'
  };

  const getHandleLeft = type => {
    return type === 'hue' ? hueX : type === 'opacity' ? opacityX : x;
  };

  const getHandleStyles = type => {
    return {
      left: getHandleLeft(type),
      top: type === 'picker' ? y : -2,
      background: backgrounds[type]
    };
  };

  return {
    getHandleStyles
  };
};