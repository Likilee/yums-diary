import { DIARY_KEY } from '@/hooks/service/queryKey'
import { DiaryDto } from '@/lib/planetscale'
import { useQuery } from '@tanstack/react-query'

const getDailyNotesByDate = async (date: string | Date): Promise<DiaryDto[]> => {
  const res = await fetch(`/api/diary/${date}`)
  return res.json()
}

export const useGetDailyNotesByDate = (date: string | Date) => {
  return useQuery({
    queryKey: [DIARY_KEY, date],
    queryFn: () => getDailyNotesByDate(date),
    enabled: !!date,
  })
}
