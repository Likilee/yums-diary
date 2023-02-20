import { Modal } from '@/components/Modal'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function CreateNoteModal() {
  const router = useRouter()

  const handleClickNewDaily = () => {
    router.push('/new')
  }

  const handleClickNewNote = () => {
    router.push('/note')
  }
  return (
    <Modal modalId="create_note">
      <div className="flex flex-col w-full gap-4">
        <label htmlFor="create_note" className="btn btn-block" onClick={handleClickNewDaily}>
          New Daily
        </label>
        <label htmlFor="create_note" className="btn btn-block" onClick={handleClickNewNote}>
          New Category
        </label>
      </div>
    </Modal>
  )
}
