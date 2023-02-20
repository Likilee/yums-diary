import type { AppProps } from 'next/app'
import AppLayout from '@/layouts/AppLayout'
import '@/styles/globals.css'
import '@/styles/calendar.css'

import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
