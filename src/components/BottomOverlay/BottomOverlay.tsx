import { PropsWithChildren } from 'react'

export default function BottomOverlay({ children }: PropsWithChildren) {
  return (
    <>
      <div className="fixed bottom-[env(safe-area-inset-bottom)] w-fit z-20 left-1/2 -translate-x-1/2">
        {children}
      </div>
    </>
  )
}
