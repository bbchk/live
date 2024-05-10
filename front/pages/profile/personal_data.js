import Head from 'next/head'
import PersonalData from 'features/profile/comps/personal_data/personal_data'
import Tabs from 'features/profile/comps/tabs/index'

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

      <div className={'d-flex'}>
        <Tabs />
        <PersonalData />
      </div>
    </>
  )
}

export default PersonalDataPage
