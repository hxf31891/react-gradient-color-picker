import { memo, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children }) => {
  var id = "id" + Math.random().toString(16).slice(2);
  const el = useRef(
    document.getElementById(id) || document.createElement('div')
  )
  const [dynamic] = useState(!el.current.parentElement)

  useEffect(() => {
    const refValue = el.current
    if (dynamic) {
      el.current.id = id
      document.body.appendChild(el.current)
    }
    return () => {
      if (dynamic && refValue.parentElement) {
        refValue.parentElement.removeChild(refValue)
      }
    }
    //eslint-disable-next-line
  }, [id]);
  return createPortal(children, el.current)
}

export default memo(Portal)
