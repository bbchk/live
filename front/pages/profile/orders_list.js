import Head from 'next/head'
import Tabs from 'features/profile/comps/tabs/index'

//todo protect personal pages with server side auth session check
//todo axios get my orders on client side
const OrdersList = () => {
  return (
    <>
      <Head>
        <title> Живий світ | Мої замовлення </title>
        <meta name='description' content='Живий Світ | Мої замовлення' />
      </Head>

      <div className={'d-flex'}>
        <Tabs />
        <h1>UNDER DEVELOPMENT</h1>
      </div>
    </>
  )
}

export default OrdersList
