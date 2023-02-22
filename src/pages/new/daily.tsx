import AutoGrowTextarea from '@/components/AutoGrowTextarea'
import CalendalModal from '@/components/CalenderModal'
import DateTitle from '@/components/DateTitle'
import { ModalTrigger } from '@/components/Modal'
import { useCreateDailyNoteMutation } from '@/hooks/useCreateDailyNoteMutation'
import { ChangeEvent, useEffect, useState } from 'react'
import { TbChevronDown } from 'react-icons/tb'

/* 💡 이 후 특정 날짜로 New 로 시작하는 기능 추가할 때, query parameter 사용 필요 */
export default function NewDaily() {
  const [date, setDate] = useState<Date>(new Date())
  const [content, setContent] = useState<string>('')
  const { mutate } = useCreateDailyNoteMutation()

  useEffect(() => {
    setDate(new Date())
  }, [])

  const handleSetDate = (value: Date, event: ChangeEvent<HTMLInputElement>) => {
    setDate(value)
  }

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  // mutation query 부터 만들자.
  const handleOnSubmit = (event: any) => {
    mutate({ date, content })
  }

  return (
    <>
      <ModalTrigger modalId="calendar">
        <h1 className="text-lg font-bold text-center mb-2">
          <DateTitle date={date} />
          <TbChevronDown className="inline-block ml-2" />
        </h1>
      </ModalTrigger>
      <AutoGrowTextarea
        value={content}
        onChange={handleTextChange}
        className="textarea textarea-ghost w-full resize-none"
      />
      <button className="btn" onClick={handleOnSubmit}>
        MUTATE
      </button>
      <CalendalModal value={date} onChange={handleSetDate} />
    </>
  )
}
