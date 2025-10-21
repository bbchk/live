import React from 'react'
import { Helmet } from 'react-helmet-async'

import WishList from 'features/user/wish_list/wish_list.js'
import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/user/comps/user.tabs'

const WishListPage = () => {
  return (
    <>
      <Helmet>
        <title>Живий світ | Список бажань</title>
        <meta
          name='description'
          content='Живий Світ | Список бажань'
        />
      </Helmet>

      <TabsLayout Tabs={Tabs} Content={WishList} />
    </>
  )
}

export default WishListPage
