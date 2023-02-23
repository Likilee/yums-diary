import { DailyNoteDto } from '@/lib/planetscale'
import { useQuery } from '@tanstack/react-query'

const getDailyNotesByDate = async (date: string | Date): Promise<DailyNoteDto[]> => {
  console.log('Date', date)
  const res = await fetch(`/api/notes/daily/${date}`)
  return res.json()
}

export const useGetDailyNotesByDate = (date: string | Date) => {
  return useQuery({
    queryKey: ['daily', date],
    queryFn: () => getDailyNotesByDate(date),
    enabled: !!date,
  })
}
