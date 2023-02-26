import cn from 'classnames'
import { PropsWithChildren, useEffect, useState } from 'react'

interface HiddenTitleProps {
  show: boolean
}

export default function HiddenTitle({ show, children }: PropsWithChildren<HiddenTitleProps>) {
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    setDisplay(show)
  }, [show])

  return (
    <h1
      className={cn(
        'w-fit',
        'text-center text-lg font-semibold ',
        'fixed z-20 left-1/2 top-[calc(1rem+max(env(safe-area-inset-top),0.5rem))] -translate-y-1/2 -translate-x-1/2', // nav bar 정중앙에 위치하도록
        'transition-opacity duration-200 opacity-0',
        display && 'opacity-100',
      )}
    >
      {children}
    </h1>
  )
}
