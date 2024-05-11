import Head from 'next/head'
import PersonalData from 'features/profile/comps/personal_data/personal_data'

import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/user/comps/user.tabs'

const PersonalDataPage = () => {
  return (
    <>
      <Head>
        <title>Живий світ | Персональна інформація</title>
        <meta
          name='description'
          content='Живий Світ | Персональна інформація'
        />
      </Head>

      <TabsLayout Tabs={Tabs} Content={PersonalData} />
    </>
  )
}

export default PersonalDataPage
