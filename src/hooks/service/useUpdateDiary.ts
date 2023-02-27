import { useMutation } from '@tanstack/react-query'
import { DiaryDto, UpdateDiaryDTO } from '@/lib/planetscale'

const updateDiary = async (data: UpdateDiaryDTO): Promise<DiaryDto> => {
  const res = await fetch('/api/diary', {
    method: 'PUT',
    body: JSON.stringify({
      data: {
        id: data.id,
        date: data.date || undefined,
        content: data.content || undefined,
      },
    }),
  })
  return res.json()
}

export const useUpdateDiary = () => {
  // const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateDiary,
    // onMutate: async (slug) => {
    //   await queryClient.cancelQueries({ queryKey: ['views'] })
    //   const previousViews = queryClient.getQueryData<ViewsTable[]>(['views'])
    //   const newViews = previousViews?.map((view) =>
    //     view.slug === slug ? { slug, count: view.count } : view,
    //   )
    //   queryClient.setQueryData(['views'], () => newViews)
    //   return { previousViews }
    // },
    // onError: (err, newViews, context) => {
    //   queryClient.setQueryData(['views'], context?.previousViews)
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['views'] })
    // },
  })
}
