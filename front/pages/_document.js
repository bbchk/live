import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='uk'>
      <Head>
        <meta charset='UTF-8' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
