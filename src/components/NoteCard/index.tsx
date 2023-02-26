interface NoteCardProps {
  content: string | null
}

export default function NoteCard({ content }: NoteCardProps) {
  return (
    <div className="w-full border border-current rounded-md p-4 text-base">
      <pre className="whitespace-pre-wrap break-words font-sans">{content}</pre>
    </div>
  )
}
