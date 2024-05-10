import TermsOfUsage from '#root/features/info/terms_of_usage.js'
import Head from 'next/head'

const UsageTerms = () => {
  return (
    <>
      <Head>
        <title> Живий світ | Умови використання сайту </title>
        <meta
          name='description'
          content='Живий Світ - Угода користувача і умови використання сайту магазину'
        />
      </Head>
      <TermsOfUsage />
    </>
  )
}

export default UsageTerms
