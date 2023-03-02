import { DIARY_KEY } from '@/hooks/service/queryKey'
import { DiaryDto } from '@/lib/planetscale'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteDiary = async ({ id, date }: { id: number; date: string }): Promise<number> => {
  const res = await fetch(`/api/diary?id=${id}`, {
    method: 'DELETE',
  })
  return res.json()
}

export const useDeleteDiary = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteDiary,
    onMutate: async ({ id, date }) => {
      await queryClient.cancelQueries({ queryKey: [DIARY_KEY, date] })
      const previousDiaries = queryClient.getQueryData<DiaryDto[]>([DIARY_KEY, date])
      const newDiaries = previousDiaries?.filter((diary) => diary.date !== date)
      queryClient.setQueryData([DIARY_KEY, date], () => newDiaries)
      return { previousDiaries }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData([DIARY_KEY, variables.date], () => context?.previousDiaries)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries([DIARY_KEY])
    },
  })
}
