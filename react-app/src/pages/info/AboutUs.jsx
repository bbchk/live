import React from 'react'
import { Helmet } from 'react-helmet-async'

import AboutUs from 'features/info/about_us'
import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/info/info.tabs'

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>Живий світ | Про нас</title>
        <meta
          name='description'
          content='Живий Світ - Магазин найкращих товарів для вашого дому, домашніх улюбленців та рослин'
        />
      </Helmet>

      <TabsLayout Tabs={() => <Tabs />} Content={AboutUs} />
    </>
  )
}

export default AboutUsPage
