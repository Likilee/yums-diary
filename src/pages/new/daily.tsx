import AutoGrowTextarea from '@/components/AutoGrowTextarea'
import CalendalModal from '@/components/CalenderModal'
import DateTitle from '@/components/DateTitle'
import { ModalTrigger } from '@/components/Modal'
import { useCreateDailyNoteMutation } from '@/hooks/useCreateDailyNoteMutation'
import { useTempDailyNote } from '@/hooks/useTempDailyNote'
import format from 'date-fns/format'
import ko from 'date-fns/locale/ko'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { TbChevronDown } from 'react-icons/tb'
import useIsVisible from '@/hooks/useIsVisible'
import HiddenTitle from '@/components/HiddenTitle'

/* 💡 이 후 특정 날짜로 New 로 시작하는 기능 추가할 때, query parameter 사용 필요 */
export default function NewDaily() {
  const router = useRouter()
  const [date, setDate] = useState<Date>(new Date())
  const [content, setContent] = useState<string>('')
  const { mutate } = useCreateDailyNoteMutation()
  const { tempDaily, setTempDaily } = useTempDailyNote()
  const dateTitleRef = useRef<HTMLHeadingElement>(null)
  const isVisible = useIsVisible(dateTitleRef)

  useEffect(() => {
    setDate(new Date())
    setContent(tempDaily)
  }, [])

  const handleSetDate = (value: Date, event: ChangeEvent<HTMLInputElement>) => {
    console.log(value)
    setDate(value)
  }

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
    setTempDaily(event.target.value)
  }

  // mutation query 부터 만들자.
  const handleOnSubmit = (event: any) => {
    mutate(
      { date, content },
      {
        onSuccess: () => {
          setTempDaily('')
          const timeZoneFormattedDate = format(date, 'yyyy-MM-dd', { locale: ko })
          router.push(`/daily/${timeZoneFormattedDate}`)
        },
      },
    )
  }

  return (
    <>
      <HiddenTitle show={!isVisible}>
        <DateTitle date={date} />
      </HiddenTitle>
      <ModalTrigger modalId="calendar">
        <h1 ref={dateTitleRef} className="text-lg font-semibold text-center mb-2 ">
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
