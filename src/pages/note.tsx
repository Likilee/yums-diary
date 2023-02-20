import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function NotePage() {
  return (
    <main>
      <textarea
        placeholder="Bio"
        className="textarea textarea-bordered textarea-lg w-full resize-none"
      ></textarea>
    </main>
  )
}
