import CalendalModal from '@/components/CalenderModal'
import ConfirmModal from '@/components/ConfirmModal'
import DateTitle from '@/components/DateTitle'
import HiddenTitle from '@/components/HiddenTitle'
import NoteCard from '@/components/NoteCard'
import { useDeleteDiary } from '@/hooks/service/useDeleteDiary'
import { useGetDailyNotesByDate } from '@/hooks/service/useGetDailyNotesByDate'
import { useUpdateDiary } from '@/hooks/service/useUpdateDiary'
import format from 'date-fns/format'
import ko from 'date-fns/locale/ko'
import { useRouter } from 'next/router'
import { ChangeEvent, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function DailyPage() {
  const router = useRouter()
  const outsideClickBoundaryRef = useRef(null)
  const [targetId, setTargetId] = useState<number>()
  const [targetDate, setTargetDate] = useState<Date>(new Date())
  const { query } = router
  const date = query.date as string

  const { data } = useGetDailyNotesByDate(date)
  const { mutate: updateMutate } = useUpdateDiary()
  const { mutate: deleteMutate } = useDeleteDiary()

  const handleSetTargetDate = (value: Date, event: ChangeEvent<HTMLInputElement>) => {
    setTargetDate(value)
  }

  const handleOnEditMode = (id: number) => {
    setTargetId(id)
  }
  const handleOnMove = () => {
    if (targetId)
      updateMutate(
        { id: targetId, date: targetDate },
        {
          onSuccess: (data, variables) => {
            const date = format(new Date(data.date), 'MMM do (EEE)', { locale: ko })
            toast.success(
              <div>
                유미의 일기를 <span className="italic">{date}</span>로 옮겼어요 :)
              </div>,
            )
          },
          onError: (error) => {
            toast.error('일기 옮기기를 실패했어요. 남편에게 문의해주세요!')
          },
        },
      )
  }

  const handleOnDelete = () => {
    if (targetId)
      deleteMutate(
        { id: targetId, date: query.date as string },
        {
          onSuccess: () => {
            toast.success('일기 하나를 지웠어요 :)')
          },
          onError: () => {
            toast.error('일기 지우기를 실패했어요. 남편에게 문의해주세요!')
          },
        },
      )
  }
  return (
    <>
      <HiddenTitle show={true}>
        <DateTitle date={query.date as string} />
      </HiddenTitle>
      <section ref={outsideClickBoundaryRef} className="flex flex-col gap-2">
        {data &&
          data.map(({ id, date, content }) => (
            <NoteCard
              key={id}
              id={id}
              date={date}
              content={content}
              outsideClickBoundary={outsideClickBoundaryRef}
              onEditMode={() => handleOnEditMode(id)}
            />
          ))}
      </section>
      <CalendalModal value={targetDate} onChange={handleSetTargetDate}>
        <label htmlFor="calendar" className="btn btn-block mt-4" onClick={handleOnMove}>
          <DateTitle date={targetDate} />
          <span>&nbsp;로 이동</span>
        </label>
      </CalendalModal>
      <ConfirmModal
        onConfirm={handleOnDelete}
        cancleButtonLabel="취소"
        confirmButtonLabel="삭제"
        title="정말 삭제하시겠어요?"
      />
    </>
  )
}
