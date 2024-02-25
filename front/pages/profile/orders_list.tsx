import TabLayout from "features/profile/comps/tab-layout";
import Order from "features/profile/comps/orders_list/order";
import Head from "next/head";

const OrdersList = () => {
  return (
    <>
    <Head>
  <title> Живий світ | Мої замовлення </title>
  <meta
    name="description"
    content="Живий Світ | Мої замовлення"
  />
</Head>
    
    <TabLayout>
      <h1>UNDER DEVELOPMENT</h1>
    </TabLayout>
    </>
  );
};

export default OrdersList;

export { default as getServerSideProps } from "../../utils/auth";
