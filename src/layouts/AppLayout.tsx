import BottomNavigation from '@/components/BottomNavigation'
import CreateNoteModal from '@/components/CreateNoteModal'
import { TopNavigation } from '@/components/TopNavigation/TopNavigation'
import { PropsWithChildren } from 'react'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <TopNavigation />
      <div className="w-full px-7 h-[100%] ">{children}</div>
      <BottomNavigation />
      <CreateNoteModal />
    </>
  )
}
