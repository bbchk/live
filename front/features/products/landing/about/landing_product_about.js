import React, { lazy, useEffect, useRef, useState } from "react";
import { Suspense } from "react";
// import { lazyLoad } from "utils/lazyLoad";
const RecsCarousel = lazy(() => import("./comps/recs_carousel"));

import s from "./landing_product_about.module.scss";

import ProductMainInfo from "./comps/product_details/product_main_info";
import ProductFigure from "./comps/product_figure";
import Description from "./comps/description";
import Characteristics from "../mutual/characteristics";
import Reviews from "./comps/reviews";
import useObserver from "hooks/useObserver.js";

const LandingProductAboutPage = ({ product }) => {
  return (
    <article className={`${s.landing_product_about}`}>
      <div className={`${s.product_figure}`}>
        <ProductFigure images={product.images} />
      </div>
      <div className={`${s.product_main_info}`}>
        <ProductMainInfo product={product} />
      </div>

      <div className={`${s.descriptionAndCharacteristics}`}>
        <div className="mb-5">
          <Description product={product} />
        </div>
        <Characteristics title={"Характеристики:"} product={product} />
      </div>

      <div className={`${s.reviews}`}>
        <Reviews product={product} />
      </div>
      <div className={`${s.recs}`}>
        <RecsCarousel />
      </div>
    </article>
  );
};

export default LandingProductAboutPage;
