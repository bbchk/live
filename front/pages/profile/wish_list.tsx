import TabLayout from "root/features/profile/comps/tab-layout";
import Gallery from "root/features/profile/comps/wish_list/gallery";

const WishList = () => {
  return (
    <TabLayout>
      <Gallery></Gallery>
    </TabLayout>
  );
};

export default WishList;

export { default as getServerSideProps } from "../../utils/auth";
