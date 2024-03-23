import { useRouter } from "next/router";
import Head from "next/head";
import { stripHtmlTags } from "utils/stripHtmlTags";
import axios from "axios";
import { Suspense, lazy, use, useEffect } from "react";

import LandingHeader from "features/products/landing/mutual/layout/landing_header";

const LandingProductAboutPage = lazy(() =>
  import("features/products/landing/about/landing_product_about")
);
// const Characteristics = lazy(() =>
//   import("features/products/landing/comps/characteristics/index")
// );

//todo make fallback page for suspense
//todo fix we take first category available on product, but it can be not the category user was in
const Landing = ({ product }) => {
  const router = useRouter();
  const { activeTab } = router.query;

  return (
    <>
      <Head>
        <title>{`${product.name} в інтернет-магазині Живий світ`}</title>
        <meta
          name="description"
          content={`${product.name}\n\n${stripHtmlTags(
            product.description.substring(0, 110)
          )}...`}
        />
      </Head>

      <LandingHeader category={product.category[0]} activeTab={activeTab} />

      <Suspense fallback={<div>Loading...</div>}>
        {activeTab == "about" && <LandingProductAboutPage product={product} />}
        {/* {activeTab == "characteristics" && (
          <Characteristics product={product} />
        )} */}
        {/* {activeTab == "reviews" && <Reviews product={product} />} */}
      </Suspense>
    </>
  );
};

export default Landing;

export async function getServerSideProps({ params }) {
  const { productId, activeTab } = params;

  const res = await axios.get(`/products/product/${productId}`);

  if (activeTab != "about" && activeTab != "characteristics") {
    return {
      notFound: true,
    };
  }

  const product = res.data;

  return {
    props: {
      product,
    },
  };
}
