import DailyCard from '@/components/DailyCard'
import HiddenTitle from '@/components/HiddenTitle'
import { useGetAllDailyNotes } from '@/hooks/useGetAllDailyNotes'
import Link from 'next/link'

export default function DiaryPage() {
  const { data, isLoading } = useGetAllDailyNotes()
  // const { year, setYear }
  return (
    <>
      <HiddenTitle show={true}>2023년</HiddenTitle>
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
