import React from 'react'
import { Helmet } from 'react-helmet-async'

import PersonalData from 'features/user/personal_data/personal_data.js'
import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/user/comps/user.tabs'

const UserProfile = () => {
  return (
    <>
      <Helmet>
        <title>Живий світ | Персональна інформація</title>
        <meta
          name='description'
          content='Живий Світ | Персональна інформація'
        />
      </Helmet>

      <TabsLayout Tabs={Tabs} Content={PersonalData} />
    </>
  )
}

export default UserProfile
