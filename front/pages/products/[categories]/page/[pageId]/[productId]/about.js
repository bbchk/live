import { useRouter } from "next/router";

import Description from "features/products/landing/comps/description";
import ProductCard from "features/products/landing/comps/product-card";

import Characteristics from "features/products/landing/comps/characteristics/characteristics";
import ReviewsList from "features/products/landing/comps/reviews-list";

import LandingProuductLayout from "features/products/landing/comps/layout/layout";
import { useFindCategoryByPath } from "../../../../../../hooks/useFindCategoryByPath";
import { useFindProductById } from "../../../../../../hooks/useFindProductById";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { untransliterate } from "@bbuukk/slugtrans/transliterate";
import { unslugify } from "@bbuukk/slugtrans/slugify";
import Head from "next/head";

const About = () => {
  const router = useRouter();

  const { categories: allCategories } = useSelector(
    (state) => state.categories
  );

  //todo look for not in allProducts but in active ones
  const { products: allProducts } = useSelector((state) => state.products);

  const { categories: categoriesPath, productObjectId } = router.query;

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);

  const { findCategoryByPath } = useFindCategoryByPath();
  const { findProductById } = useFindProductById();

  useEffect(() => {
    if (allCategories && allProducts) {
      setCategory(
        findCategoryByPath(
          untransliterate(unslugify(categoriesPath)),
          allCategories
        )
      );

      setProduct(findProductById(productObjectId, allProducts));
    }
    console.log(product);
  }, [allCategories, allProducts]);

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
