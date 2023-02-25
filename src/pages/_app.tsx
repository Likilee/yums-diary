import type { AppProps } from 'next/app'
import localFont from '@next/font/local'
import AppLayout from '@/layouts/AppLayout'
import '@/styles/globals.css'
import '@/styles/calendar.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import cn from 'classnames'

const leeSeoyun = localFont({
  src: '../../public/font/LeeSeoyun.woff2',
  variable: '--font-leeseoyun',
  preload: true,
})

const simkyungha = localFont({
  src: '../../public/font/SimKyungha.woff2',
  variable: '--font-simkyungha',
  preload: true,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout className={cn(leeSeoyun.variable, simkyungha.variable, 'font-sans')}>
        <Component {...pageProps} />
      </AppLayout>
    </QueryClientProvider>
  )
}
