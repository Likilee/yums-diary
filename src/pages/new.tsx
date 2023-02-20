export default function NewDailyNote() {
  const today = new Date()

  return <div>
    <h1>
    {today.toLocaleDateString()}
    </h1>
    </div>
}
