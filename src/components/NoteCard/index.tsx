import AutoGrowTextarea from '@/components/AutoGrowTextarea'
import EditableWrapper from '@/components/EditableWrapper'
import { useUpdateDiary } from '@/hooks/service/useUpdateDiary'
import debounce from '@/lib/debounce'
import { UpdateDiaryDTO } from '@/lib/planetscale'
import { ChangeEvent, RefObject, useEffect, useMemo, useState } from 'react'

interface NoteCardProps {
  id: number
  date: string
  content: string | null
  outsideClickBoundary?: RefObject<HTMLElement>
  onEditMode: () => void
}

const useDebouncedUpdate = (delay: number) => {
  const { mutate } = useUpdateDiary()
  const debouncedUpdateDiary = useMemo(
    () =>
      debounce(({ id, content, date }: UpdateDiaryDTO) => {
        mutate({ id, content })
      }, delay),
    [mutate, delay],
  )
  return debouncedUpdateDiary
}

export default function NoteCard({
  id,
  date,
  content,
  outsideClickBoundary,
  onEditMode,
}: NoteCardProps) {
  const [newContent, setNewContent] = useState<string>(content || '')
  useEffect(() => {
    setNewContent(content || '')
  }, [content])

  const debouncedUpdateDiary = useDebouncedUpdate(1000)

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(event.target.value)
    debouncedUpdateDiary({ id, content: event.target.value || undefined })
  }

  return (
    <EditableWrapper
      onEditMode={onEditMode}
      triggerTimeMs={500}
      boundary={outsideClickBoundary}
    >
      <AutoGrowTextarea
        value={newContent || ''}
        onChange={handleTextChange}
        minHeight="1rem"
        className="textarea textarea-ghost w-full whitespace-pre-wrap break-words resize-none text-lg border border-current rounded-md h-fit"
      />
    </EditableWrapper>
  )
}
