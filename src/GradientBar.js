import React, { useRef, useEffect, useState } from "react"
import { usePicker } from "./context"
import throttle from "lodash.throttle"
import { computeBarPosition } from './utils'

const GradientBar = ({}) => {
  const { value, addPoint, colors, selectedColor } = usePicker()
  const [tempColor, setTempColor] = useState(value)

  useEffect(() => {
    setTimeout(() => setTempColor(value), 300)
  }, [value])

  return(
    <div style={{width: '100%', height: 14, marginTop: 14, backgroundImage: tempColor, borderRadius: 10}} className='ps-rl' onMouseDown={(e) => addPoint(e)}>
      {colors?.map((c, i) => (<Handle left={c.left} key={`${i}-${c}`} i={i} />))}
    </div>
  )
}

export default GradientBar

export const Handle = ({ left, i }) => {
  const { handleSelectedColor, handleGradientLeft, offsetLeft, selectedColor } = usePicker()
  const handleRef = useRef(null)
  const isSelected = selectedColor === i

  useEffect(() => {
    const onMouseMove = throttle(e => {
      handleGradientLeft((e.clientX - offsetLeft) / 2.8)
    }, 150)

    function onMouseUp(e) {
      document.body.removeEventListener("mousemove", onMouseMove)
      document.body.removeEventListener("mouseup", onMouseUp)
    }

    function onMouseDown(e) {
      e.stopPropagation(e)
      handleSelectedColor(e, i)
      document.body.addEventListener("mousemove", onMouseMove)
      document.body.addEventListener("mouseup", onMouseUp)
    }

    const href = handleRef.current
    href.addEventListener("mousedown", onMouseDown)

    return () => {
      href.removeEventListener("mousedown", onMouseDown)
      document.body.removeEventListener("mousemove", onMouseMove)
      document.body.removeEventListener("mouseup", onMouseUp)
    }
  }, [offsetLeft, handleGradientLeft])

  return(
    <div style={handleStyle(left, isSelected)} className='handle' onClick={(e) => handleSelectedColor(e, i)} ref={handleRef} />
  )
}

const handleStyle = (left, isSelected) => {
  return {
    top: -2,
    left: left * 2.8,
    boxShadow: isSelected ? '0px 0px 5px 1px rgba(86, 140, 245,.95)' : '',
    border: isSelected ? '2px solid white' : '2px solid rgba(255,255,255,.75)',
  }
}
