import React from 'react';

const TrashIcon = () => {
  return(
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className='icon' style={{width: 14.5}}>
      <path d="M6.5,1h3a.5.5,0,0,1,.5.5v1H6v-1A.5.5,0,0,1,6.5,1ZM11,2.5v-1A1.5,1.5,0,0,0,9.5,0h-3A1.5,1.5,0,0,0,5,1.5v1H1.5a.5.5,0,0,0,0,1H2l.85,10.66a2,2,0,0,0,2,1.84h6.22a2,2,0,0,0,2-1.84L14,3.5h.54a.5.5,0,0,0,0-1H11Zm2,1-.85,10.58a1,1,0,0,1-1,.92H4.89a1,1,0,0,1-1-.92L3,3.5Zm-7.49,1A.5.5,0,0,1,6,5l.5,8.5a.5.5,0,0,1-1,.06L5,5a.5.5,0,0,1,.47-.53Zm5.06,0A.5.5,0,0,1,11,5h0l-.5,8.5a.5.5,0,1,1-1,0v0L10,5A.5.5,0,0,1,10.53,4.5ZM8,4.5a.5.5,0,0,1,.5.5v8.5a.5.5,0,0,1-1,0V5A.5.5,0,0,1,8,4.5Z" />
    </svg>
  )
}

export default TrashIcon;

export const LinearIcon = () => {
  const styles = { fill: 'none', stroke: '#323136', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '1.8px' }
  return(
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style={{width: 14}}>
      <polyline style={styles} points="0.9 12.73 0.9 19.1 7.27 19.1 0.9 19.1 19.1 0.9 12.73 0.9 19.1 0.9 19.1 7.27"/>
    </svg>
  )
}

export const RadialIcon = () => {
  const styles = { fill: 'none', stroke: '#323136', strokeMiterlimit: 10, strokeWidth: '1.8px' }
  return(
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style={{width: 15}}>
      <circle style={styles} cx="10" cy="10" r="9"/>
      <circle style={styles} cx="10" cy="10" r="5"/>
    </svg>
  )
}
