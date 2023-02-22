import { useMutation } from '@tanstack/react-query'
import { CreateDailyNoteDTO } from '@/lib/planetscale'

const createNewDailyNote = async (data: CreateDailyNoteDTO) => {
  const res = await fetch('/api/notes/daily', {
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    method: 'POST',
    body: JSON.stringify(data),
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
