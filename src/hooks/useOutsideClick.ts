import { useEffect, useRef } from 'react'

type CallbackType = () => void

const useOutsideClick = <T extends HTMLElement>(callback: CallbackType): React.RefObject<T> => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    const isTouchDevice = 'ontouchstart' in document.documentElement
    const clickEvent = isTouchDevice ? 'touchstart' : 'mousedown'

    document.addEventListener(clickEvent, handleClick, true)

    return () => {
      document.removeEventListener(clickEvent, handleClick, true)
    }
  }, [callback, ref])

  return ref
}

export default useOutsideClick
