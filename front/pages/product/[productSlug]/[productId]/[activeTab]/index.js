import { useRouter } from "next/router";
import Head from "next/head";
import { stripHtmlTags } from "utils/stripHtmlTags";
import axios from "axios";
import { Suspense, lazy, use, useEffect } from "react";

import LandingHeader from "features/products/landing/mutual/layout/landing_header";
import { useDispatch } from "react-redux";
import { stopLoading } from "store/modalSlice.js";

const LandingProductAboutPage = lazy(() =>
  import("features/products/landing/about/landing_product_about")
);
const Characteristics = lazy(() =>
  import("features/products/landing/characteristics/index")
);
const LandingProductReviewsPage = lazy(() =>
  import("features/products/landing/reviews/reviews_page")
);

//todo make fallback page for suspense
//todo fix we take first category available on product, but it can be not the category user was in
const Landing = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { activeTab } = router.query;

  useEffect(() => {
    dispatch(stopLoading());
  }, [product]);

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
        {activeTab == "characteristics" && (
          <Characteristics product={product} />
        )}

        {activeTab == "reviews" && (
          <LandingProductReviewsPage
            reviews={product.reviews || []}
            product={product}
          />
        )}
      </Suspense>
    </>
  );
};

export default Landing;

export async function getServerSideProps({ params }) {
  const { productId, activeTab } = params;

  const res = await axios.get(`/products/product/${productId}`);

  if (!["about", "characteristics", "reviews"].includes(activeTab)) {
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
