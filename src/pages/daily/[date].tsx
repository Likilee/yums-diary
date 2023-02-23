import NoteCard from '@/components/NoteCard'
import { useGetDailyNotesByDate } from '@/hooks/useGetDailyNotesByDate'
import { useRouter } from 'next/router'

export default function DailyPage() {
  const router = useRouter()
  const { query } = router
  const { data } = useGetDailyNotesByDate(query.date as string)

  console.log(data)
  return (
    <>
      <h1 className="text-center">{query.date}</h1>
      {data && data.map((note) => <NoteCard content={note.content} key={note.id} />)}
    </>
  )
}
