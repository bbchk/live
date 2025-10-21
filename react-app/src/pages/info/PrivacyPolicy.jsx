import React from 'react'
import { Helmet } from 'react-helmet-async'

import PrivacyPolicy from 'features/info/privacy_policy'
import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/info/info.tabs'

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Живий світ | Політика конфіденційності</title>
        <meta
          name='description'
          content='Політика конфіденційності магазину Живий Світ'
        />
      </Helmet>

      <TabsLayout Tabs={() => <Tabs />} Content={PrivacyPolicy} />
    </>
  )
}

export default PrivacyPolicyPage
