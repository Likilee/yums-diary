import { Modal } from '@/components/Modal'
import { useRouter } from 'next/router'
import { TbCalendar, TbNotebook } from 'react-icons/tb'

export default function CreateNoteModal() {
  const router = useRouter()

  const handleClickNewDaily = () => {
    router.push('/new/diary')
  }

  const handleClickNewNote = () => {
    router.push('/new/note')
  }
  return (
    <Modal modalId="create_note">
      <div className="flex flex-col w-full gap-4">
        <label
          htmlFor="create_note"
          className="btn btn-block text-xl"
          onClick={handleClickNewDaily}
        >
          <TbCalendar />
          &nbsp;New Diary
        </label>
        <label
          htmlFor="create_note"
          className="btn btn-block text-xl"
          onClick={handleClickNewNote}
        >
          <TbNotebook />
          &nbsp;New Note
        </label>
      </div>
    </Modal>
  )
}
