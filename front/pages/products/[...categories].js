import ProductGallery from "root/features/products/listing/comps/gallery/gallery";
import ProductHeader from "root/features/products/listing/comps/product-header";
import ProductFilter from "root/features/products/listing/comps/filter/filter";
import SortGroup from "root/features/products/listing/comps/filter/sort-group";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCategoryContext } from "../../hooks/useCategoryContext";
import { useProductContext } from "../../hooks/useProductContext";

const Products = () => {
  const context = useProductContext();
  const { allProducts, currentProducts } = context.products || {};
  const { dispatch } = context;

  return (
    <div className="mt-5 ">
      <div className="mx-5">
        {/* <ProductHeader category={currectCategory} /> */}
        <div className="mt-5">{/* <SortGroup /> */}</div>
      </div>

      <hr className="mt-2 mb-4 splitter " />

      {/* {currentProducts && ( */}
      <div className="d-flex ms-3 me-5">
        <div className="me-3">
          {/* <ProductFilter products={currentProducts} /> */}
          {currentProducts && (
            <ProductFilter currentProducts={currentProducts} />
          )}
        </div>
        {/* <ProductGallery products={currentProducts} /> */}
        <ProductGallery />
      </div>
      {/* )} */}
    </div>
  );
};

export default Products;
