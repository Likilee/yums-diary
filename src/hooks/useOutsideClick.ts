import { RefObject, useEffect, useRef } from 'react'

type CallbackType = () => void

const useOutsideClick = <T extends HTMLElement, U extends HTMLElement = HTMLElement>(
  callback: CallbackType,
  boundary?: RefObject<U>,
): React.RefObject<T> => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || !(event.target instanceof Node)) return
      if (!boundary && !ref.current.contains(event.target)) {
        callback()
      }
      if (
        boundary &&
        boundary.current &&
        boundary.current.contains(event.target) &&
        !ref.current.contains(event.target)
      ) {
        callback()
      }
    }

    const isTouchDevice = 'ontouchstart' in document.documentElement
    const clickEvent = isTouchDevice ? 'touchstart' : 'mousedown'

    document.addEventListener(clickEvent, handleClick, false)

    return () => {
      document.removeEventListener(clickEvent, handleClick, false)
    }
  }, [callback, ref, boundary])

  return ref
}

export default useOutsideClick
