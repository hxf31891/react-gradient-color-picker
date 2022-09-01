import React, { useState } from "react";
import { getHandleValue } from './utils';
import { usePicker } from "./context";
import { barWrap, psRl, barWrapInner, df, jc, ac, gradientHandleWrap, gradientHandle } from './style'

const GradientBar = () => {
  const { currentColor, addPoint, colors, value, handleGradient, squareSize } = usePicker()
  const [dragging, setDragging] = useState(false);

  function force90degLinear(string) {
    return color.replace(
      /(radial|linear)-gradient\([^,]+,/,
      'linear-gradient(90deg,'
    );
  }

  const stopDragging = () => {
    setDragging(false)
  }

  const handleDown = (e) => {
    if (!dragging) {
      addPoint(e);
    }
  }

  const handleMove = (e) => {
    if (dragging) {
      handleGradient(currentColor, getHandleValue(e))
    }
  }

  return(
    <div onMouseEnter={stopDragging} onMouseLeave={stopDragging} style={{ ...barWrap, width: squareSize + 36 }}>
      <div onMouseUp={stopDragging} style={{ ...psRl, ...barWrapInner }}>
        <div onMouseDown={(e) => handleDown(e)} onMouseMove={(e) => handleMove(e)} style={{ paddingTop: 6, paddingBottom: 6 }}>
          <div style={{width: squareSize, height: 14, backgroundImage: force90degLinear(value), borderRadius: 10}} />
        </div>
        {colors?.map((c, i) => (<Handle left={c.left} key={`${i}-${c}`} i={i} setDragging={setDragging} />))}
      </div>
    </div>
  )
}

export default GradientBar

export const Handle = ({ left, i, setDragging }) => {
  const { setSelectedColor, selectedColor, squareSize } = usePicker();
  const isSelected = selectedColor === i;
  const leftMultiplyer = (squareSize - 18) / 100

  const handleDown = (e) => {
    e.stopPropagation();
    setSelectedColor(i);
    setDragging(true)
  }

  return(
    <div style={{ left: left * leftMultiplyer + 13, ...gradientHandleWrap }} onMouseDown={(e) => handleDown(e)}>
      <div style={{...handleStyle(isSelected), ...gradientHandle, ...df, ...jc, ...ac }}>{isSelected && <div style={{width: 5, height:5, borderRadius: '50%', background: 'white'}} />}</div>
    </div>
  )
}

const handleStyle = (isSelected) => {
  return {
    boxShadow: isSelected ? '0px 0px 5px 1px rgba(86, 140, 245,.95)' : '',
    border: isSelected ? '2px solid white' : '2px solid rgba(255,255,255,.75)',
  }
}
