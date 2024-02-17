import { useRouter } from "next/router";

import Description from "root/features/products/landing/comps/description";
import ProductCard from "root/features/products/landing/comps/product-card";

import Characteristics from "root/features/products/landing/comps/characteristics/characteristics";
import ReviewsList from "root/features/products/landing/comps/reviews-list";

import LandingProuductLayout from "../../../../features/products/landing/comps/layout/layout";

const About = () => {
  const router = useRouter();

  let { category, product } = router.query;
  category = JSON.parse(category);
  product = JSON.parse(product);

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
