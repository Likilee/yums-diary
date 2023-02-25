import { useMutation } from '@tanstack/react-query'
import { CreateDailyNoteDTO, DailyNoteDto } from '@/lib/planetscale'
import format from 'date-fns/format'

const createNewDailyNote = async (data: CreateDailyNoteDTO): Promise<DailyNoteDto> => {
  console.log('저장', data.date.toISOString())
  const res = await fetch('/api/notes/daily', {
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    method: 'POST',
    body: JSON.stringify({
      date: data.date.toISOString(),
      content: data.content,
    }),
  })
  return res.json()
}

export const useCreateDailyNoteMutation = () => {
  // const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createNewDailyNote,
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
