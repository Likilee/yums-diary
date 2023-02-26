import { DIARY_KEY } from '@/hooks/service/queryKey'
import { useQuery } from '@tanstack/react-query'

const getAllDailyNotes = async (): Promise<{ date: string; note_count: number }[]> => {
  const res = await fetch('/api/diary')
  return res.json()
}

export const useGetAllDailyNotes = () => {
  return useQuery({
    queryKey: [DIARY_KEY],
    queryFn: () => getAllDailyNotes(),
  })
}
