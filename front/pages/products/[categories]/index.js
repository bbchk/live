import { useSelector } from "react-redux";

import ProductGallery from "root/features/products/listing/comps/gallery/gallery";
import ProductHeader from "root/features/products/listing/comps/product-header";
import ProductFilter from "root/features/products/listing/comps/filter/filter";
import SortGroup from "root/features/products/listing/comps/filter/sort-group";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { useGetActiveProducts } from "root/hooks/useGetActiveProducts";
import { useGetActiveCategory } from "/hooks/useGetActiveCategory";
import SubcategoriesGallery from "root/features/products/listing/comps/subcategories/gallery";

const Products = () => {
  const router = useRouter();
  const { categories: path } = router.query;

  const { products: allProducts } = useSelector((state) => state.products);
  const { categories: allCategories } = useSelector(
    (state) => state.categories
  );

  const [isLoading, setIsLoading] = useState(true);
  const [activeProducts, setActiveProducts] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const { getActiveProducts } = useGetActiveProducts();
  const { getActiveCategory } = useGetActiveCategory();

  //setting active category
  useEffect(() => {
    if (allCategories) {
      setIsLoading(true);
      const activeCategory = getActiveCategory(allCategories, path);

      if (activeCategory == null) {
        router.push("/404");
      }

      setActiveCategory(activeCategory);
    }
  }, [allCategories, path]);

  //setting active products
  useEffect(() => {
    if (activeCategory != null && allProducts != null) {
      const activeProducts = getActiveProducts(allProducts, activeCategory);

      setActiveProducts(activeProducts);
      setIsLoading(false);
    }
  }, [activeCategory, allProducts]);

  return (
    <>
      {!isLoading && (
        <div className="mt-3 ">
          <div className="mx-5">
            {activeCategory && (
              <>
                <ProductHeader category={activeCategory} />
                <SubcategoriesGallery category={activeCategory} />
              </>
            )}

            <div className="mt-5">
              <SortGroup />
            </div>
          </div>

          <hr className="mt-2 mb-4 splitter " />

          <div className="d-flex ms-3 me-5">
            <div className="me-3">
              {/* {productsref.current && (
                // <ProductFilter products={productsref.current} />
              )} */}
            </div>
            {activeProducts && (
              <ProductGallery
                products={activeProducts}
                activeCategory={activeCategory}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
