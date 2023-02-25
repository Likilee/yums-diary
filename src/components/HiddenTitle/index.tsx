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
        'text-center text-lg font-semibold absolute left-1/2 top-9 -translate-y-1/2 -translate-x-1/2',
        'transition-opacity duration-200 opacity-0',
        display && 'opacity-100',
      )}
    >
      {children}
    </h1>
  )
}
