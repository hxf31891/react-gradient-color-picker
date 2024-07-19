import React from 'react'
import { usePicker } from '../context.js'

type ColorProps = {
  color: string
}

const TrashIcon = () => {
  const { defaultStyles } = usePicker()

  const styles = {
    fill: 'none',
    strokeWidth: '1.8px',
  }
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ width: 15 }}
    >
      <polyline
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ ...styles, ...defaultStyles.rbgcpControlIcon }}
        points="17.96 4.31 2.04 4.3 3.75 4.3 4.81 17.29 5.16 17.96 5.74 18.47 6.59 18.62 13.64 18.62 14.52 18.32 15.07 17.68 15.29 17.12 16.28 4.3 12.87 4.3 12.87 2.38 12.48 1.75 11.83 1.46 8.4 1.46 7.64 1.68 7.26 2.21 7.16 2.52 7.17 4.23"
      />
    </svg>
  )
}

export default TrashIcon

export const LinearIcon = ({ color }: ColorProps) => {
  const { defaultStyles } = usePicker()

  const col = color || ''
  const styles = {
    fill: 'none',
    strokeWidth: '1.8px',
  }
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ width: 14 }}
    >
      <polyline
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          ...styles,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col }),
        }}
        points="0.9 12.73 0.9 19.1 7.27 19.1 0.9 19.1 19.1 0.9 12.73 0.9 19.1 0.9 19.1 7.27"
      />
    </svg>
  )
}

export const RadialIcon = ({ color }: ColorProps) => {
  const { defaultStyles } = usePicker()

  const col = color || ''
  const styles = {
    fill: 'none',
    strokeMiterlimit: 10,
    strokeWidth: '1.8px',
  }
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ width: 15 }}
    >
      <circle
        style={{
          ...styles,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col }),
        }}
        cx="10"
        cy="10"
        r="9"
      />
      <circle
        style={{
          ...styles,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col }),
        }}
        cx="10"
        cy="10"
        r="5"
      />
    </svg>
  )
}

export const SlidersIcon = ({ color }: ColorProps) => {
  const { defaultStyles } = usePicker()

  const col = color || ''
  const style1 = {
    fill: 'none',
    strokeWidth: '1.8px',
  }
  const style2 = {
    strokeWidth: '1.8px',
  }

  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ width: 17 }}
    >
      <polyline
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          ...style1,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col }),
        }}
        points="3.74 2.75 3.74 12.69 0.9 12.71 6.59 12.71"
      />
      <line
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          ...style2,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col, fill: col }),
        }}
        x1="3.74"
        y1="17.26"
        x2="3.74"
        y2="15.21"
      />
      <polyline
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          ...style1,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col }),
        }}
        points="10.1 17.25 10.1 7.31 12.95 7.29 7.26 7.29"
      />
      <line
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          ...style2,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col, fill: col }),
        }}
        x1="10.1"
        y1="2.74"
        x2="10.1"
        y2="4.79"
      />
      <polyline
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          ...style1,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col }),
        }}
        points="16.26 2.75 16.26 12.69 13.41 12.71 19.1 12.71"
      />
      <line
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          ...style2,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col, fill: col }),
        }}
        x1="16.26"
        y1="17.26"
        x2="16.26"
        y2="15.21"
      />
    </svg>
  )
}

export const InputsIcon = ({ color }: ColorProps) => {
  const { defaultStyles } = usePicker()

  const col = color || ''
  const style1 = {
    fill: 'none',
    strokeWidth: '1.8px',
  }
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ width: 17 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          ...style1,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col }),
        }}
        d="M6.35,2.72a4.85,4.85,0,0,1,1.86.16,7.94,7.94,0,0,1,.88.43,3.66,3.66,0,0,0,.85.49c.25,0,.58-.27.81-.39A8.25,8.25,0,0,1,11.7,3a4,4,0,0,1,1.79-.23,3.21,3.21,0,0,0-1.34.09,6.39,6.39,0,0,0-1.47.63c-.45.25-.7.3-.7.86s0,1.18,0,1.78c0,1.3,0,2.61,0,3.92h0v5.63a2.46,2.46,0,0,1,0,.47c-.07.28-.43.42-.7.57a5.29,5.29,0,0,1-2.94.61A9.3,9.3,0,0,0,8,17.15l1.09-.37.89-.52c.06,0,.48.21.56.25.32.14.64.27,1,.38a8.54,8.54,0,0,0,2.12.4"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          ...style1,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col }),
        }}
        d="M7.57,5.73C6,5.7,4.5,5.65,3,5.77a2.28,2.28,0,0,0-1.76.74A2.3,2.3,0,0,0,.94,7.83l0,3.82A4.73,4.73,0,0,0,1,12.9a1.64,1.64,0,0,0,.68,1,2.44,2.44,0,0,0,1,.27,25,25,0,0,0,4.74.09"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          ...style1,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col }),
        }}
        d="M12.43,14.32a44.12,44.12,0,0,0,4.6,0,2.24,2.24,0,0,0,1.76-.74,2.29,2.29,0,0,0,.27-1.32l0-3.81A4.81,4.81,0,0,0,19,7.15a1.62,1.62,0,0,0-.68-1,2.31,2.31,0,0,0-1-.28,26.8,26.8,0,0,0-4.74-.09"
      />
    </svg>
  )
}

export const PaletteIcon = ({ color }: ColorProps) => {
  const { defaultStyles } = usePicker()

  const col = color || ''
  const style2 = {
    strokeMiterlimit: 10,
    strokeWidth: '0.5px',
  }
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ width: 17 }}
    >
      <circle
        style={{
          ...defaultStyles.rbgcpControlIcon2,
          ...(col && { fill: col }),
        }}
        cx="9.36"
        cy="5.07"
        r="1.71"
      />
      <circle
        style={{
          ...defaultStyles.rbgcpControlIcon2,
          ...(col && { fill: col }),
        }}
        cx="13.93"
        cy="6.91"
        r="1.71"
      />
      <circle
        style={{
          ...defaultStyles.rbgcpControlIcon2,
          ...(col && { fill: col }),
        }}
        cx="5.8"
        cy="7.55"
        r="1.71"
      />
      <circle
        style={{
          ...defaultStyles.rbgcpControlIcon2,
          ...(col && { fill: col }),
        }}
        cx="5.45"
        cy="12.04"
        r="1.71"
      />
      <path
        style={{
          ...style2,
          ...defaultStyles.rbgcpControlIcon,
          ...defaultStyles.rbgcpControlIcon2,
          ...(col && { fill: col, stroke: col }),
        }}
        d="M19.1,10c0,3.58-2.12,2.94-4.06,2.35-1.15-.34-2.24-.67-2.77-.08-.68.78-.54,2.07-.39,3.33.2,1.79.39,3.5-1.88,3.5A9.1,9.1,0,1,1,19.1,10ZM10,18c.7,0,.74-.19.75-.2a2.67,2.67,0,0,0,.07-1.27c0-.19,0-.42-.06-.67-.06-.53-.13-1.15-.14-1.67a3.82,3.82,0,0,1,.8-2.63,2.14,2.14,0,0,1,1.45-.7,4.36,4.36,0,0,1,1.32.12c.39.08.8.21,1.16.32h0c.39.12.74.23,1.08.3.74.17,1,.1,1.13,0S18,11.32,18,10a8,8,0,1,0-8,8Z"
      />
    </svg>
  )
}

export const DegreesIcon = ({ color }: { color?: string }) => {
  const { defaultStyles } = usePicker()

  const col = color || ''
  const style2 = {
    fill: 'none',
    strokeMiterlimit: 10,
    strokeWidth: '1.8px',
  }
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ width: 15 }}
    >
      <polyline
        strokeLinecap="round"
        style={{
          ...style2,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col }),
        }}
        points="13.86 2.01 1.7 16.99 18.77 16.99"
      />
      <polyline
        strokeLinecap="round"
        style={{
          ...style2,
          ...defaultStyles.rbgcpControlIcon,
          ...(col && { stroke: col }),
        }}
        points="10.96 16.38 10.96 16.38 10.74 15.7 10.44 14.97 10.06 14.21 9.72 13.63 9.21 12.89 8.85 12.44 8.41 11.95 7.91 11.45 7.51 11.1"
      />
    </svg>
  )
}

export const StopIcon = () => {
  const { defaultStyles } = usePicker()

  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ width: 20, marginRight: 1 }}
    >
      <path
        style={{ ...defaultStyles.rbgcpControlIcon2 }}
        d="M2.39,8c-.63,0-1,.21-1,.63A.49.49,0,0,0,1.67,9a6.48,6.48,0,0,0,1.11.43A3,3,0,0,1,4,10.09a1.47,1.47,0,0,1,.35,1.09,1.75,1.75,0,0,1-.57,1.42,2.21,2.21,0,0,1-1.48.48,8.32,8.32,0,0,1-1.68-.21l-.31-.06.12-.94a13.7,13.7,0,0,0,1.8.16c.61,0,.92-.26.92-.77a.52.52,0,0,0-.21-.44,3.13,3.13,0,0,0-.85-.34A3.32,3.32,0,0,1,.66,9.79a1.43,1.43,0,0,1-.42-1.1A1.6,1.6,0,0,1,.78,7.36a2.32,2.32,0,0,1,1.49-.44,10.46,10.46,0,0,1,1.64.17l.32.07-.1.95C3.31,8,2.73,8,2.39,8Z"
      />
      <path
        style={{ ...defaultStyles.rbgcpControlIcon2 }}
        d="M4.79,8.09V7H9.16V8.09H7.59V13H6.38V8.09Z"
      />
      <path
        style={{ ...defaultStyles.rbgcpControlIcon2 }}
        d="M14,12.34a2.25,2.25,0,0,1-1.91.74,2.24,2.24,0,0,1-1.91-.74A3.85,3.85,0,0,1,9.61,10a4,4,0,0,1,.56-2.34,2.2,2.2,0,0,1,1.91-.77A2.21,2.21,0,0,1,14,7.69,4,4,0,0,1,14.55,10,3.85,3.85,0,0,1,14,12.34Zm-2.88-.77a1,1,0,0,0,1,.46,1,1,0,0,0,1-.46A3.25,3.25,0,0,0,13.3,10,3.45,3.45,0,0,0,13,8.46a1,1,0,0,0-1-.49,1,1,0,0,0-1,.49A3.43,3.43,0,0,0,10.85,10,3.38,3.38,0,0,0,11.11,11.57Z"
      />
      <path
        style={{ ...defaultStyles.rbgcpControlIcon2 }}
        d="M17.77,11.24h-1V13H15.58V7h2.19a1.85,1.85,0,0,1,2.11,2.07,2.21,2.21,0,0,1-.54,1.6A2.07,2.07,0,0,1,17.77,11.24Zm-1-1h1c.6,0,.9-.37.9-1.12a1.18,1.18,0,0,0-.22-.79.88.88,0,0,0-.68-.24h-1Z"
      />
    </svg>
  )
}
