import { useRouter } from "next/router";

import Description from "features/products/landing/comps/description";
import ProductCard from "features/products/landing/comps/product-card";

import Characteristics from "features/products/landing/comps/characteristics/characteristics";
import ReviewsList from "features/products/landing/comps/reviews-list";

import LandingProuductLayout from "features/products/landing/comps/layout/layout";
import { useFindCategoryByPath } from "hooks/useFindCategoryByPath";
import { useFindProductById } from "hooks/useFindProductById";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { untransliterate } from "@bbuukk/slugtrans/transliterate";
import { unslugify } from "@bbuukk/slugtrans/slugify";
import Head from "next/head";
import { setActiveIndi } from "store/productsSlice";

const About = () => {
  const router = useRouter();

  const { categories: allCategories } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();

  //todo look for not in allProducts but in active ones
  const { products: allProducts } = useSelector((state) => state.products);

  const { categories: categoriesPath, productId } = router.query;

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);

  const { findCategoryByPath } = useFindCategoryByPath();
  const { findProductById } = useFindProductById();

  useEffect(() => {
    if (allCategories && allProducts) {
      console.log("🚀 ~ allProducts:", allProducts);
      console.log("🚀 ~ productObjectId:", productId);
      setProduct(findProductById(productId, allProducts));
    }
  }, [allCategories, allProducts]);

  useEffect(() => {
    console.log("category");
    if (product) {
      setCategory(product.category[0]);
    }
  }, [product]);

  return (
    <>
      {category && product && (
        <>
          <Head>
            <title>{product.name} в інтернет-магазині Живий світ</title>
            <meta
              name="description"
              content={`${product.name}\n\n${product.description[
                "Опис"
              ].substring(0, 110)}...`}
            />
          </Head>
          <LandingProuductLayout
            category={category}
            product={product}
            activePage={"about"}
          >
            {/* <DecorLine /> */}

            <div>
              <ProductCard product={product} />
              <div className="d-flex">
                <div className="w-50">
                  <Description product={product} />
                  <Characteristics
                    title={"Характеристики:"}
                    product={product}
                  />
                </div>
                {/* <ReviewsList /> */}
              </div>
            </div>
          </LandingProuductLayout>
        </>
      )}
    </>
  );
};

export default About;

// export async function getStaticProps({ params }) {
//   // Fetch product data based on params.productSlug
//   const productData = await fetchProductData(params.productSlug);

//   return {
//     props: {
//       productData,
//     },
//   };
// }
