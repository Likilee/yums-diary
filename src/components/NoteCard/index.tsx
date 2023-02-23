interface NoteCardProps {
  content: string | null
}

export default function NoteCard({ content }: NoteCardProps) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">{content}</p>
      </div>
    </div>
  )
}
