import { useRouter } from "next/router";
import Head from "next/head";
import { stripHtmlTags } from "utils/stripHtmlTags";
import axios from "axios";
import { Suspense, lazy } from "react";

import LandingHeader from "features/products/landing/mutual/layout/landing_header";

const LandingProductAboutPage = lazy(() =>
  import("features/products/landing/about/landing_product_about")
);
const Characteristics = lazy(() =>
  import("features/products/landing/characteristics/index")
);
const LandingProductReviewsPage = lazy(() =>
  import("features/products/landing/reviews/reviews_page")
);

import { useStopLoading } from "hooks/useStopLoading";

//todo make fallback page for suspense
//todo fix we take first category available on product, but it can be not the category user was in
const Landing = ({ product }) => {
  const router = useRouter();
  const { activeTab } = router.query;

  useStopLoading();

  //todo delete
  product.reviews = [
    {
      id: 1,
      starRating: 2.4,
      cons: "Немає",
      pros: "Відмінний телефон",
      comment:
        "0 годин роботи в інтернеті через Wi-Fi або перегляду відео». У мене вистачає ну максимум годин на 5 просмотру відео. Я розумію що 5 годин це і є «до 10 годин», але я не розумію у чому справа. Може треба повернути його, обміняти?",
      date: "01.01.2021",
      author: "Бучок Богдан",
      likes: 5,
      dislikes: 10,
      subreviews: ["Blah blah blah", "Blah blah blah", "Blah blah blah"],
    },
  ];

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
          <LandingProductReviewsPage product={product} />
        )}
      </Suspense>
    </>
  );
};

export default Landing;

export async function getServerSideProps({ params }) {
  const { productId, activeTab } = params;

  const res = await axios.get(`/products/product/by-id/${productId}`);

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
