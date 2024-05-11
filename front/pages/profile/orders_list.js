import Head from 'next/head'

import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/user/comps/user.tabs'

//todo protect personal pages with server side auth session check
//todo axios get my orders on client side
const OrdersList = () => {
  return (
    <>
      <Head>
        <title> Живий світ | Мої замовлення </title>
        <meta name='description' content='Живий Світ | Мої замовлення' />
      </Head>

      <TabsLayout
        Tabs={Tabs}
        Content={() => (
          <div className='w-100 h-100 bg-white'>
            <h1>UNDER DEVELOPMENT</h1>
          </div>
        )}
      />
    </>
  )
}

export default OrdersList
