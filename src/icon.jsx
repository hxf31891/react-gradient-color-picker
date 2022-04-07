import React from 'react';

const TrashIcon = () => {
  const styles = { fill: 'none', stroke: 'rgb(50, 49, 54)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '1.8px' }
  return(
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style={{width: 15}}>
      <polyline style={styles} points="17.96 4.31 2.04 4.3 3.75 4.3 4.81 17.29 5.16 17.96 5.74 18.47 6.59 18.62 13.64 18.62 14.52 18.32 15.07 17.68 15.29 17.12 16.28 4.3 12.87 4.3 12.87 2.38 12.48 1.75 11.83 1.46 8.4 1.46 7.64 1.68 7.26 2.21 7.16 2.52 7.17 4.23"/>
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

export const MenuIcon = () => {
const styles = { fill: 'rgb(50, 49, 54)', stroke: 'rgb(50, 49, 54)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '1.8px' }
  return(
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style={{width: 14}}>
      <circle style={styles} cx="2.42" cy="10" r="1.42"/>
      <circle style={styles} cx="10" cy="10" r="1.42"/>
      <circle style={styles} cx="17.58" cy="10" r="1.42"/>
    </svg>
  )
}
