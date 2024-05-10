import Policy from '#root/features/info/privacy_policy.js'
import Head from 'next/head'

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
      <Policy />
    </>
  )
}

export default PrivacyPolicy
