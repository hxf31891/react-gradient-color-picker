import { darkStyles } from './darkStyles.js'
import { Styles } from '../shared/types.js'

export const styles: Styles = {
  body: {
    boxSizing: 'border-box',
    background: 'rgb(255, 255, 255)',
  },
  rbgcpControlBtn: {
    paddingLeft: '8px',
    paddingRight: '8px',
    lineHeight: '1',
    borderRadius: '4px',
    fontWeight: 700,
    fontSize: '12px',
    height: '24px',
    transition: 'all 160ms ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0)',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0)',
    color: 'rgb(86, 86, 86)',
  },
  rbgcpControlIcon: {
    stroke: 'rgb(50, 49, 54)',
  },
  rbgcpControlIconBtn: {
    width: '30px',
    height: '24px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  rbgcpControlBtnWrapper: {
    height: '28px',
    background: '#e9e9f5',
    borderRadius: '6px',
    padding: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rbgcpColorModelDropdown: {
    position: 'absolute',
    right: '-2px',
    top: '34px',
    padding: '5px',
    background: '#e9e9f5',
    zIndex: 100000000,
    borderRadius: '6px',
    boxShadow: '1px 1px 14px 1px rgba(0, 0, 0, 0.25)',
  },
  rbgcpEyedropperCover: {
    position: 'fixed',
    left: '0px',
    top: '0px',
    zIndex: 100000000,
    width: '100vw',
    height: '100vh',
    cursor: 'copy',
  },
  rbgcpControlInput: {
    height: '24px',
    borderRadius: '4px',
    border: 'none',
    outline: 'none',
    textAlign: 'center',
    width: '34px',
    fontWeight: 500,
    color: 'rgb(50, 49, 54)',
    fontSize: '13px',
    background: 'transparent',
  },
  rbgcpInputLabel: {
    textAlign: 'center',
    lineHeight: '1.2',
    fontWeight: 700,
    color: 'rgb(86, 86, 86)',
    fontSize: '11px',
  },
  rbgcpInput: {
    height: '32px',
    borderRadius: '6px',
    border: '1px solid #bebebe',
    width: '100%',
    padding: '2px',
    outline: 'none',
    color: 'black',
    fontWeight: 400,
    textAlign: 'center',
  },
  rbgcpHandle: {
    position: 'absolute',
    border: '2px solid white',
    borderRadius: '50%',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
    width: '18px',
    height: '18px',
    zIndex: 1000,
    transition: 'all 30ms linear',
    boxSizing: 'border-box',
    willChange: 'transform',
    outline: 'none',
  },
  rbgcpCanvasWrapper: {
    borderRadius: '6px',
    overflow: 'hidden',
    height: '294px',
  },
  rbgcpCheckered: {
    background: `linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.18) 25%,
      transparent 25%,
      transparent 75%,
      rgba(0, 0, 0, 0.18) 75%,
      rgba(0, 0, 0, 0.18) 0
    ),
    linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.18) 25%,
      transparent 25%,
      transparent 75%,
      rgba(0, 0, 0, 0.18) 75%,
      rgba(0, 0, 0, 0.18) 0
    ),
    white`,
    backgroundRepeat: 'repeat, repeat',
    backgroundPosition: '0px 0, 7px 7px',
    transformOrigin: '0 0 0',
    backgroundOrigin: 'padding-box, padding-box',
    backgroundClip: 'border-box, border-box',
    backgroundSize: '14px 14px, 14px 14px',
    boxShadow: 'none',
    textShadow: 'none',
    transition: 'none',
    transform: 'scaleX(1) scaleY(1) scaleZ(1)',
    borderRadius: '10px',
  },
  rbgcpOpacityOverlay: {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '100%',
    height: '100%',
    borderRadius: '10px',
  },
  rbgcpGradientHandleWrap: {
    position: 'absolute',
    zIndex: 10000,
    top: '-2px',
    outline: 'none',
  },
  rbgcpGradientHandle: {
    border: '2px solid white',
    borderRadius: '50%',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rbgcpControlIcon2: {
    fill: '#323136',
  },
  rbgcpControlBtnSelected: {
    background: 'white',
    color: '#568cf5',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
  },
  rbgcpComparibleLabel: {
    color: '#323136',
  },
}

export const getStyles = (disableDarkMode: boolean) => {
  if (typeof window === 'undefined' || disableDarkMode) return styles
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    for (const key in darkStyles) {
      if (Object.prototype.hasOwnProperty.call(darkStyles, key)) {
        ;(styles as Record<string, any>)[key] = {
          ...(Object.prototype.hasOwnProperty.call(styles, key)
            ? (styles as Record<string, any>)[key]
            : {}),
          ...(darkStyles as Record<string, any>)[key],
        }
      }
    }

    return styles
  }
  return styles
}

export const colorTypeBtnStyles = (
  selected: boolean,
  styles: Styles
): React.CSSProperties => {
  if (selected) {
    return { ...styles.rbgcpControlBtn, ...styles.rbgcpControlBtnSelected }
  } else {
    return { ...styles.rbgcpControlBtn }
  }
}

export const controlBtnStyles = (
  selected: boolean,
  styles: Styles
): React.CSSProperties => {
  if (selected) {
    return { ...styles.rbgcpControlIconBtn, ...styles.rbgcpControlBtnSelected }
  } else {
    return { ...styles.rbgcpControlIconBtn }
  }
}

export const modalBtnStyles = (
  selected: boolean,
  styles: Styles
): React.CSSProperties => {
  if (selected) {
    return {
      ...styles.rbgcpControlBtn,
      ...styles.rbgcpColorModelDropdownBtn,
      ...styles.rbgcpControlBtnSelected,
    }
  } else {
    return { ...styles.rbgcpControlBtn, ...styles.rbgcpColorModelDropdownBtn }
  }
}

