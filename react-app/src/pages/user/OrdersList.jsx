import React from 'react'
import { Helmet } from 'react-helmet-async'

import OrdersList from 'features/user/orders_list/orders_list.js'
import TabsLayout from 'comps/layout/tabs/tabs.layout'
import Tabs from 'features/user/comps/user.tabs'

const OrdersListPage = () => {
  return (
    <>
      <Helmet>
        <title>Живий світ | Історія замовлень</title>
        <meta
          name='description'
          content='Живий Світ | Історія замовлень'
        />
      </Helmet>

      <TabsLayout Tabs={Tabs} Content={OrdersList} />
    </>
  )
}

export default OrdersListPage
