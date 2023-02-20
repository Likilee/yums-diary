import DailyCard from '@/components/DailyCard'

export default function HomePage() {
  return (
    <>
      <h1 className="w-full text-center mb-4">2023</h1>
      <div className="flex flex-col gap-2">
        <DailyCard />
        <DailyCard />
      </div>
    </>
  )
}
