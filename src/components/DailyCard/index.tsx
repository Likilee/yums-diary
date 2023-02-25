import DateTitle from '@/components/DateTitle'

interface DailyCardProps {
  date: string | Date
  noteCount: number
}

export default function DailyCard({ date, noteCount }: DailyCardProps) {
  console.log('HERE', date)
  return (
    <button className="btn btn-outline btn-block flex flex-row justify-between">
      <DateTitle date={date}></DateTitle>
      <span>{`${noteCount} 개의 글`}</span>
    </button>
  )
}
