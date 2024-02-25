import TabLayout from "features/profile/comps/tab-layout";
import Gallery from "features/profile/comps/wish_list/gallery";
import Head from "next/head";

const WishList = () => {
  return (
    <>
        <Head>
  <title> Живий світ | Список бажаних товарів </title>
  <meta
    name="description"
    content="Живий Світ | Список бажаних товарів"
  />
</Head>
    
    <TabLayout>
      {/* <Gallery></Gallery> */}
      <h1>UNDER DEVELOPMENT</h1>
    </TabLayout>
    </>
  );
};

export default WishList;

export { default as getServerSideProps } from "../../utils/auth";
