import BottomNavigation from '@/components/BottomNavigation'
import CreateNoteModal from '@/components/CreateNoteModal'
import { TopNavigation } from '@/components/TopNavigation/TopNavigation'
import cn from 'classnames'
import { PropsWithChildren } from 'react'

export default function AppLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('h-full w-full', className)}>
      <TopNavigation />
      <div className="w-full px-7 overflow-y-scroll scrollbar-hide h-[calc(100%-4rem-3rem)] absolute top-16 z-content">
        {children}
      </div>
      <BottomNavigation />
      <CreateNoteModal />
    </div>
  )
}
