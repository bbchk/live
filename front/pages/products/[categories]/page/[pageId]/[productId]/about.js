import { useRouter } from "next/router";

import Description from "root/features/products/landing/comps/description";
import ProductCard from "root/features/products/landing/comps/product-card";

import Characteristics from "root/features/products/landing/comps/characteristics/characteristics";
import ReviewsList from "root/features/products/landing/comps/reviews-list";

import LandingProuductLayout from "root/features/products/landing/comps/layout/layout";
import { useFindCategoryByPath } from "../../../../../../hooks/useFindCategoryByPath";
import { useFindProductById } from "../../../../../../hooks/useFindProductById";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { untransliterate } from "@bbuukk/slugtrans/transliterate";
import { unslugify } from "@bbuukk/slugtrans/slugify";

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
  }, [allCategories, allProducts]);

  return (
    <>
      {category && product && (
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
                <Characteristics title={"Характеристики:"} product={product} />
              </div>
              {/* <ReviewsList /> */}
            </div>
          </div>
        </LandingProuductLayout>
      )}
    </>
  );
};

export default About;
