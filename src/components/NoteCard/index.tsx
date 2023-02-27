import AutoGrowTextarea from '@/components/AutoGrowTextarea'

interface NoteCardProps {
  content: string | null
}

export default function NoteCard({ content }: NoteCardProps) {
  const handleTextChange = () => {
    console.log('temp')
  }

  return (
    <AutoGrowTextarea
      value={content || ''}
      onChange={handleTextChange}
      minHeight="1rem"
      className="textarea textarea-ghost w-full whitespace-pre-wrap break-words resize-none text-lg border border-current rounded-md h-fit"
    />
  )
}
