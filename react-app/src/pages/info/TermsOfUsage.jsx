import React from 'react'
import { Helmet } from 'react-helmet-async'

import TermsOfUsage from 'features/info/terms_of_usage'
import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/info/info.tabs'

const TermsOfUsagePage = () => {
  return (
    <>
      <Helmet>
        <title>Живий світ | Умови використання</title>
        <meta
          name='description'
          content='Умови використання магазину Живий Світ'
        />
      </Helmet>

      <TabsLayout Tabs={() => <Tabs />} Content={TermsOfUsage} />
    </>
  )
}

export default TermsOfUsagePage
