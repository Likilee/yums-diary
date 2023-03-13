import AppToaster from '@/components/AppToaster/AppToaster'
import BottomNavigation from '@/components/BottomNavigation'
import CreateNoteModal from '@/components/CreateNoteModal'
import { TopNavigation } from '@/components/TopNavigation/TopNavigation'
import cn from 'classnames'
import { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

export default function AppLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('h-full w-full flex', className)}>
      <TopNavigation />
      <div
        className={cn(
          'flex-1 w-full overflow-y-scroll scrollbar-hide z-content',
          'py-2',
          'pl-[max(env(safe-area-inset-left),2rem)]', // ios safe-area left-padding
          'pr-[max(env(safe-area-inset-right),2rem)]', // ios safe-area right-padding
          'mt-[calc(2.5rem+max(env(safe-area-inset-top),0.5rem))] ', // subtrack top nav height
          'mb-[calc(3rem+env(safe-area-inset-bottom))]', // subtrack bottom nav height
        )}
      >
        {children}
      </div>
      <BottomNavigation />
      <AppToaster />
    </div>
  )
}
