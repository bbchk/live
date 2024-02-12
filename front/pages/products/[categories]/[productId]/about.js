import { useRouter } from "next/router";

import Description from "root/features/products/landing/comps/description";
import ProductCard from "root/features/products/landing/comps/product-card";
import Navigation from "root/features/products/landing/comps/navigation";

import Characteristics from "root/features/products/landing/comps/characteristics/characteristics";
import ReviewsList from "root/features/products/landing/comps/reviews-list";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { makeSlug } from "root/utils/slugify";
import Breadcrumbs from "root/comps/breadcrumbs";

const About = () => {
  //todo search in active Products collection, not in all the products

  const { lastActiveProduct: activeProduct } = useSelector(
    (state) => state.products
  );
  const { lastActiveCategory: activeCategory } = useSelector(
    (state) => state.categories
  );

  return (
    <>
      {activeCategory && activeProduct && (
        <>
          {/* <DecorLine /> */}
          <div className="">
            <Breadcrumbs activeCategory={activeCategory} />
            <Navigation
              activePage={"about"}
              productSlug={makeSlug(activeProduct.name)}
            />
          </div>

          <div>
            <ProductCard product={activeProduct} />
            <div className="d-flex">
              <div className="w-50">
                <Description product={activeProduct} />
                <Characteristics
                  title={"Характеристики:"}
                  product={activeProduct}
                />
              </div>
              {/* <ReviewsList /> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default About;
