import AboutUs from 'features/info/about_us'
import Head from 'next/head'
import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/info/info.tabs'

const ShopInfo = () => {
  return (
    <>
      <Head>
        <title> Живий світ | Про нас </title>
        <meta
          name='description'
          content='Живий Світ - Магазин найкращих товарів для вашого дому, домашніх улюбленців та рослин '
        />
      </Head>

      <TabsLayout Tabs={() => <Tabs />} Content={AboutUs} />
    </>
  )
}

export default ShopInfo
