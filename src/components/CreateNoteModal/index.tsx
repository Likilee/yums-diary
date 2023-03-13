import { Modal } from '@/components/Modal'
import { useRouter } from 'next/router'
import { TbCalendar, TbNotebook } from 'react-icons/tb'

/* 💡
  New Notebook 버튼을 클릭핸들러
  New Note 버튼 클릭 핸들러 필요
*/

interface CreateNoteModalProps {
  onClickNewNote: () => void
  onClickNewNotebook: () => void
}

export default function CreateNoteModal({
  onClickNewNote,
  onClickNewNotebook,
}: CreateNoteModalProps) {
  return (
    <Modal modalId="create_note">
      <div className="flex flex-col w-full gap-4">
        <label
          htmlFor="create_note"
          className="btn btn-block text-xl"
          onClick={onClickNewNotebook}
        >
          New Notebook
        </label>
        <label htmlFor="create_note" className="btn btn-block text-xl" onClick={onClickNewNote}>
          New Note
        </label>
      </div>
    </Modal>
  )
}
