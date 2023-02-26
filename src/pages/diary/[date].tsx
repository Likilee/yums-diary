import DateTitle from '@/components/DateTitle'
import HiddenTitle from '@/components/HiddenTitle'
import NoteCard from '@/components/NoteCard'
import { useGetDailyNotesByDate } from '@/hooks/service/useGetDailyNotesByDate'
import { useRouter } from 'next/router'

export default function DailyPage() {
  const router = useRouter()
  const { query } = router
  const { data } = useGetDailyNotesByDate(query.date as string)

  return (
    <>
      <HiddenTitle show={true}>
        <DateTitle date={query.date as string} />
      </HiddenTitle>
      <section className="flex flex-col gap-2">
        {data &&
          data.map((note, index, array) => <NoteCard key={note.id} content={note.content} />)}
      </section>
    </>
  )
}
