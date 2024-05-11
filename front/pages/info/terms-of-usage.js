import TermsOfUsage from '#root/features/info/terms_of_usage.js'
import Head from 'next/head'
import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/info/info.tabs'

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
      <TabsLayout Tabs={Tabs} Content={TermsOfUsage} />
    </>
  )
}

export default UsageTerms
