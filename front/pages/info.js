import { Info } from "../features/info/info";
import Head from "next/head";

const ShopInfo = () => {
  return (
    <>
      <Head>
        <title> Живий світ | Про нас </title>
        <meta
          name="description"
          content="Живий Світ - Магазин найкращих товарів для вашого дому, домашніх улюбленців та рослин "
        />
      </Head>
      <div className="container mt-4">
        <Info />
      </div>
    </>
  );
};

export default ShopInfo;
