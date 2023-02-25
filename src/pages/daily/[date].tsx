import DateTitle from '@/components/DateTitle'
import HiddenTitle from '@/components/HiddenTitle'
import NoteCard from '@/components/NoteCard'
import { useGetDailyNotesByDate } from '@/hooks/useGetDailyNotesByDate'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

export default function DailyPage() {
  const router = useRouter()
  const { query } = router
  const { data } = useGetDailyNotesByDate(query.date as string)

  console.log(data)
  return (
    <>
      <HiddenTitle show={true}>
        <DateTitle date={query.date as string} />
      </HiddenTitle>
      {data &&
        data.map((note, index, array) => (
          <div key={note.id}>
            <NoteCard content={note.content} />
            {array.length - 1 !== index && <div className="divider"></div>}
          </div>
        ))}
    </>
  )
}
