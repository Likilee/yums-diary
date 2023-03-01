import { useEffect, useRef } from 'react'

type CallbackType = () => void

const useOutsideClick = <T extends HTMLElement>(callback: CallbackType): React.RefObject<T> => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick, true)

    return () => {
      document.removeEventListener('mousedown', handleClick, true)
    }
  }, [callback, ref])

  return ref
}

export default useOutsideClick
