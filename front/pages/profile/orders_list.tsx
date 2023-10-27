import TabLayout from "root/features/profile/comps/tab-layout";
import Order from "root/features/profile/comps/orders_list/order";

const OrdersList = () => {
  return (
    <TabLayout>
      <Order />
      <Order />
      <Order />
    </TabLayout>
  );
};

export default OrdersList;

export { default as getServerSideProps } from "../../utils/auth";
