import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='uk'>
      <Head>
        <meta charSet='UTF-8' />
        <link rel='icon' href='/favicon.ico' />
        {/* <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Pacifico:wght@400&display=swap'
          rel='stylesheet'
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

//todo add to ci
// name: Lighthouse CI
// on: push
// jobs:
//   lighthouse:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v4
//       - name: Audit URLs using Lighthouse
//         uses: treosh/lighthouse-ci-action@v11
//         with:
//           urls: |
//             https://example.com/
//             https://example.com/blog
//           budgetPath: ./budget.json
//           uploadArtifacts: true
//           temporaryPublicStorage: true
