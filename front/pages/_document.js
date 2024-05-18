import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='uk'>
      <Head>
        <meta charSet='UTF-8' />
        <link rel='icon' href='/favicon.ico' />
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
