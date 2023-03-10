import AutoGrowTextarea from '@/components/AutoGrowTextarea'
import CalendalModal from '@/components/CalenderModal'
import DateTitle from '@/components/DateTitle'
import { ModalTrigger } from '@/components/Modal'
import { useCreateDailyNoteMutation } from '@/hooks/service/useCreateDailyNoteMutation'
import { useTempDailyNote } from '@/hooks/useTempDailyNote'
import format from 'date-fns/format'
import ko from 'date-fns/locale/ko'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { TbChevronDown } from 'react-icons/tb'
import useIsVisible from '@/hooks/useIsVisible'
import HiddenTitle from '@/components/HiddenTitle'
import BottomOverlay from '@/components/BottomOverlay/BottomOverlay'
import { toast } from 'react-hot-toast'

const MIN_CONTENT_LENGTH = 5
/* π‘ μ΄ ν νΉμ  λ μ§λ‘ New λ‘ μμνλ κΈ°λ₯ μΆκ°ν  λ, query parameter μ¬μ© νμ */
export default function NewDiaryPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date>(new Date())
  const [content, setContent] = useState<string>('')
  const { mutate } = useCreateDailyNoteMutation()
  const { tempDaily, setTempDaily } = useTempDailyNote()

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

  // mutation query λΆν° λ§λ€μ.
  const handleOnSubmit = (event: any) => {
    if (content.trim().length < MIN_CONTENT_LENGTH) {
      toast('μ μ₯νκΈ°μ λλ¬΄ μ§§μ§ μμμ? γγ')
      return
    }

    mutate(
      { date, content },
      {
        onSuccess: () => {
          setTempDaily('')
          const timeZoneFormattedDate = format(date, 'yyyy-MM-dd', { locale: ko })
          router.push(`/diary/${timeZoneFormattedDate}`)
          toast.success('μ λ―Έμ μλ‘μ΄ κΈ°μ΅ μ μ₯ β€οΈ')
        },
        onError: () => {
          toast.error('λ¬Έμ κ° μλλ΄μ κ°λ°μμκ² λ¬ΈμνμΈμ!')
        },
      },
    )
  }

  return (
    <>
      <ModalTrigger modalId="calendar">
        <HiddenTitle show={true}>
          <DateTitle date={date} />
          <TbChevronDown className="inline-block ml-2" />
        </HiddenTitle>
      </ModalTrigger>
      <AutoGrowTextarea
        value={content}
        onChange={handleTextChange}
        className="textarea textarea-ghost w-full resize-none text-lg"
      />
      <BottomOverlay>
        <button
          className="bg-base-100 border-0 text-current btn text-lg "
          onClick={handleOnSubmit}
        >
          SAVE
        </button>
      </BottomOverlay>
      <CalendalModal value={date} onChange={handleSetDate} />
    </>
  )
}
