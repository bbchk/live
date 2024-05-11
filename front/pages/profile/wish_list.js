import Head from 'next/head'
import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/user/wish_list/wish_list.tabs'

const WishList = () => {
  return (
    <>
      <Head>
        <title> Живий світ | Список бажаних товарів </title>
        <meta
          name='description'
          content='Живий Світ | Список бажаних товарів'
        />
      </Head>

      {/* <TabLayout> */}
      {/* <Gallery></Gallery> */}

      <TabsLayout
        Tabs={Tabs}
        Content={() => <div className='w-100 h-100 bg-primary' />}
      />

      {/* </TabLayo ut> */}
    </>
  )
}

export default WishList

// WishList.auth = true;
