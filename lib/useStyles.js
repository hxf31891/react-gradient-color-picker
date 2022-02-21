import { usePicker } from './context';
export const useHandleStyle = () => {
  const {
    hue,
    hueX,
    opacityX,
    squareXY
  } = usePicker();
  const backgrounds = {
    hue: `hsla(${hue}, 100%, 50%, 1)`,
    opacity: 'transparent'
  };

  const getHandleLeft = type => {
    return type === 'hue' ? hueX : type === 'opacity' ? opacityX : squareXY[0];
  };

  const getHandleStyles = type => {
    return {
      left: getHandleLeft(type),
      top: type === 'picker' ? squareXY[1] : -2,
      background: backgrounds[type]
    };
  };

  return {
    getHandleStyles
  };
};