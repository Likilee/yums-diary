import BottomNavigation from '@/components/BottomNavigation'
import CreateNoteModal from '@/components/CreateNoteModal'
import { TopNavigation } from '@/components/TopNavigation/TopNavigation'
import { PropsWithChildren } from 'react'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <TopNavigation />
      <div className="w-full px-7 flex-1 overflow-y-scroll scrollbar-hide">{children}</div>
      <BottomNavigation />
      <CreateNoteModal />
    </>
  )
}
