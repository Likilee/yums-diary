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
    <div className={cn('flex flex-col break-keep h-screen', className)}>
      <TopNavigation />
      <div className="w-full px-7 flex-1 overflow-y-scroll scrollbar-hide">{children}</div>
      <BottomNavigation />
      <CreateNoteModal />
    </div>
  )
}
