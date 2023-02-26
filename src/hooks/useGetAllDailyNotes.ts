import { DiaryDto } from '@/lib/planetscale'
import { useQuery } from '@tanstack/react-query'

const getAllDailyNotes = async (): Promise<{ date: string; note_count: number }[]> => {
  const res = await fetch('/api/notes/daily')
  return res.json()
}

export const useGetAllDailyNotes = () => {
  return useQuery({
    queryKey: ['daily'],
    queryFn: () => getAllDailyNotes(),
  })
}
