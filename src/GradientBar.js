import React, { useRef, useEffect, useState } from "react"
import { usePicker } from "./context"
import throttle from "lodash.throttle"
import { computeBarPosition } from './utils'

const GradientBar = ({}) => {
  const { color, addPoint, colors } = usePicker()
  const [tempColor, setTempColor] = useState(color)

  useEffect(() => {
    setTimeout(() => setTempColor(color), 300)
  }, [color])

  return(
    <div style={{width: '100%', height: 14, marginTop: 14, backgroundImage: tempColor, borderRadius: 10}} className='ps-rl' onClick={(e) => addPoint(e)}>
      {colors?.map((c, i) => (<Handle left={c.left} key={`${i}-${c}`} i={i} />))}
    </div>
  )
}

export default GradientBar

export const Handle = ({ left, i }) => {
  const { handleSelectedColor, setGradientLeft, offsetLeft } = usePicker()
  const handleRef = useRef(null)

  useEffect(() => {
    const onMouseMove = throttle(e => {
      setGradientLeft((e.clientX - offsetLeft) / 2.8)
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
  }, [offsetLeft])



  return(
    <div style={{left: left * 2.8, top: -2}} className='handle' onClick={(e) => handleSelectedColor(e, i)} ref={handleRef}/>
  )
}
