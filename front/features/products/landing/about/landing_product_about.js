import React, { lazy, useEffect, useRef, useState } from "react";
import { Suspense } from "react";
// import { lazyLoad } from "utils/lazyLoad";
const RecsCarousel = lazy(() => import("./comps/recs_carousel"));

import s from "./landing_product_about.module.scss";

import ProductMainInfo from "./comps/product_details/product_main_info";
import ProductFigure from "./comps/product_figure";
import Description from "./comps/description";
import Characteristics from "../mutual/characteristics";

const LandingProductAboutPage = ({ product }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(ref.current);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <article className={`${s.landing_product_about}`}>
      <div className={`${s.product_figure}`}>
        <ProductFigure images={product.images} />
      </div>
      <div className={`${s.product_main_info}`}>
        <ProductMainInfo product={product} />
      </div>

      <div className={`${s.description}`} ref={ref}>
        <Description product={product} />
      </div>
      <div className={`${s.characteristics}`}>
        <Characteristics title={"Характеристики:"} product={product} />
      </div>

      <div className={`${s.reviews}`}>{/* <ReviewList> */}</div>

      {isVisible && (
        <div className={`${s.recs}`}>
          <RecsCarousel isVisible={isVisible} />
        </div>
      )}
    </article>
  );
};

export default LandingProductAboutPage;
