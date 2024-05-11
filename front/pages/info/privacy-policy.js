import Policy from '#root/features/info/privacy_policy.js'
import Head from 'next/head'
import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/info/info.tabs'

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title> Живий світ | Політика конфіденційності </title>
        <meta
          name='description'
          content='Живий Світ | Політика конфіденційності'
        />
      </Head>

      <TabsLayout Tabs={Tabs} Content={Policy} />
    </>
  )
}

export default PrivacyPolicy
