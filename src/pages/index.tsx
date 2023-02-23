import DailyCard from '@/components/DailyCard'
import { useGetAllDailyNotes } from '@/hooks/useGetAllDailyNotes'
import Link from 'next/link'

export default function HomePage() {
  const { data, isLoading } = useGetAllDailyNotes()

  return (
    <>
      <h1 className="w-full text-center mb-4">2023</h1>
      <div className="flex flex-col gap-2">
        {data &&
          data.map(({ date, note_count }) => (
            <Link href={`/daily/${date}`} key={date}>
              <DailyCard date={date} noteCount={note_count} />
            </Link>
          ))}
      </div>
    </>
  )
}
