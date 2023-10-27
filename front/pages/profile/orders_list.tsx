import TabLayout from "@/features/profile/comps/tab-layout";
import Order from "@/features/profile/comps/orders_list/order";

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
