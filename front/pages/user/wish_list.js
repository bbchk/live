import Head from 'next/head'
import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/user/comps/user.tabs'
import Gallery from 'features/user/wish_list/gallery'

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

      <TabsLayout Tabs={Tabs} Content={Gallery} />
    </>
  )
}

export default WishList

// WishList.auth = true;
