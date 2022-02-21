import React, { useRef, useEffect } from "react"
import throttle from "lodash.throttle"
import { usePicker } from './context'
import { Handle, BarWrapper, GradientBg } from './components'

const Opacity = () => {
  const bar = useRef(null);
  const { handleOpacity, offsetLeft } = usePicker();

  useEffect(() => {
    const onMouseMove = throttle(e => {
      handleOpacity(e)
    }, 150)

    function onMouseUp(e) {
      handleOpacity(e)
      document.body.removeEventListener("mousemove", onMouseMove)
      document.body.removeEventListener("mouseup", onMouseUp)
    }

    function onMouseDown(e) {
      document.body.addEventListener("mousemove", onMouseMove)
      document.body.addEventListener("mouseup", onMouseUp)
    }

    const barRef = bar.current
    barRef.addEventListener("mousedown", onMouseDown)

    return () => {
      barRef.removeEventListener("mousedown", onMouseDown)
      document.body.removeEventListener("mousemove", onMouseMove)
      document.body.removeEventListener("mouseup", onMouseUp)
    }
  }, [offsetLeft])

  return(
    <BarWrapper reffy={bar}>
      <Handle type='opacity' />
      <GradientBg />
      <div className='opacity-overlay' />
    </BarWrapper>
  )
}

export default Opacity
