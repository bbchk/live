import { useDispatch, useSelector } from "react-redux";

import ProductGallery from "root/features/products/listing/comps/gallery/gallery";
import ProductHeader from "root/features/products/listing/comps/product-header";
import ProductFilter from "root/features/products/listing/comps/filter/filter";
import SortGroup from "root/features/products/listing/comps/filter/sort-group";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { useGetActiveProducts } from "root/hooks/useGetActiveProducts";
import { useGetActiveCategory } from "/hooks/useGetActiveCategory";
import SubcategoriesGallery from "root/features/products/listing/comps/subcategories/gallery";
import { useGetSubcategoriesOf } from "../../../hooks/useGetSubcategoriesOf";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeProducts, setActiveProducts] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const { products: allProducts } = useSelector((state) => state.products);
  const { categories: allCategories } = useSelector(
    (state) => state.categories
  );

  const { getSubcategoriesOf } = useGetSubcategoriesOf();
  const { getActiveProducts } = useGetActiveProducts();
  const { getActiveCategory } = useGetActiveCategory();

  const router = useRouter();
  const { categories: activeCategoryPath } = router.query;
  console.log(router.query);
  // const category = JSON.parse(router.query.category);

  //setting active category
  useEffect(() => {
    setIsLoading(true);

    let category = router.query.category;

    //if user directly navigate to page using url
    if (category == null) {
      if (activeCategoryPath && allCategories) {
        category = getActiveCategory(activeCategoryPath, allCategories);

        //if category was not found
        if (category == null) {
          router.push("/404");
        }

        setActiveCategory(category);
      }
    } else {
      //if user using ui
      setActiveCategory(JSON.parse(category));
    }
  }, [allCategories, activeCategoryPath]);

  //setting active products
  useEffect(() => {
    setIsLoading(true);

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
            <>
              <ProductHeader category={activeCategory} />
              <SubcategoriesGallery
                subcategories={getSubcategoriesOf(
                  activeCategory,
                  allCategories
                )}
              />
            </>

            <div className="mt-5">
              <SortGroup />
            </div>
          </div>

          <hr className="mt-2 mb-4 splitter " />

          <div className="d-flex ms-3 me-5">
            <div className="me-3">
              {/* <ProductFilter products={activeProducts} /> */}
            </div>

            <ProductGallery
              activeProducts={activeProducts}
              activeCategory={activeCategory}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
