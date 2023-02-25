import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" data-theme="coffee">
      <Head>
        <link rel="manifest" href="/pwa/manifest.json" />
        <link href="/pwa/favicon.ico" rel="icon" type="image/x-icon" sizes="16x16" />
        <link rel="apple-touch-icon" href="/pwa/icons/icon-192x192.png" />
        <meta name="msapplication-TileColor" content="#f5a623"></meta>
        <meta name="application-name" content="유미의 일기장" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="유미의 일기장" />
        <meta name="theme-color" content="#f5a623" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
