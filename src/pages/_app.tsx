import type { AppProps } from 'next/app'
import localFont from '@next/font/local'
import AppLayout from '@/layouts/AppLayout'
import '@/styles/globals.css'
import '@/styles/calendar.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import cn from 'classnames'
import Head from 'next/head'

const leeSeoyun = localFont({
  src: '../../public/font/LeeSeoyun.woff2',
  variable: '--font-leeseoyun',
  display: 'swap',
  preload: true,
})

const simkyungha = localFont({
  src: '../../public/font/SimKyungha.woff2',
  variable: '--font-simkyungha',
  preload: true,
})

const pretendardVaribale = localFont({
  src: '../../public/font/PretendardKR-VF-distilled.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
  display: 'swap',
  preload: false,
  adjustFontFallback: 'Arial',
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
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AppLayout
          className={cn(
            leeSeoyun.variable,
            simkyungha.variable,
            pretendardVaribale.variable,
            'font-pretendard',
          )}
        >
          <Component {...pageProps} />
        </AppLayout>
      </QueryClientProvider>
    </>
  )
}
