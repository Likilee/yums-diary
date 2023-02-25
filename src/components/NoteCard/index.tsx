interface NoteCardProps {
  content: string | null
}

export default function NoteCard({ content }: NoteCardProps) {
  return (
    <div className="w-full">
      <div className="px-4">
        <p className="break-words ">{content}</p>
      </div>
    </div>
  )
}
