import ProductGallery from "root/features/products/listing/comps/gallery/gallery";
import ProductHeader from "root/features/products/listing/comps/product-header";
import ProductFilter from "root/features/products/listing/comps/filter/filter";
import SortGroup from "root/features/products/listing/comps/filter/sort-group";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { useGetActiveProducts } from "root/hooks/useGetActiveProducts";
import { useCategoryContext } from "root/hooks/useCategoryContext";
import { useProductContext } from "root/hooks/useProductContext";
import { useGetActiveCategory } from "/hooks/useGetActiveCategory";
import { ActiveFiltersContextProvider } from "root/features/products/listing/context/activeFiltersContext";
import SubcategoriesGallery from "root/features/products/listing/comps/subcategories/gallery";
import { useSelector } from "react-redux";

const Products = () => {
  const router = useRouter();
  const { categories: path = [] } = router.query;
  const { getProducts } = useGetActiveProducts();
  const { categories } = useCategoryContext();

  const { products: allProducts } = useSelector((state) => state.products);

  const [products, setProducts] = useState(null);
  const productsref = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const { getActiveCategory } = useGetActiveCategory();

  //setting active category
  useEffect(() => {
    if (categories) {
      setIsLoading(true);
      const category = getActiveCategory(path, categories);

      //checks if category was found
      if (category == null) {
        router.push("/404");
      }

      setActiveCategory(category);
    }
  }, [categories, path]);

  //setting active products
  useEffect(() => {
    if (activeCategory != null && allProducts != null) {
      const activeProducts = getProducts(allProducts, activeCategory);
      setProducts(activeProducts);
      productsref.current = activeProducts;
      setIsLoading(false);
    }
  }, [activeCategory, allProducts]);

  return (
    <>
      {!isLoading && (
        <ActiveFiltersContextProvider>
          <div className="mt-3 ">
            <div className="mx-5">
              <ProductHeader category={activeCategory} />
              <SubcategoriesGallery
                category={activeCategory}
                categories={categories}
              />
              <div className="mt-5">
                <SortGroup />
              </div>
            </div>

            <hr className="mt-2 mb-4 splitter " />

            <div className="d-flex ms-3 me-5">
              <div className="me-3">
                {productsref.current && (
                  <ProductFilter products={productsref.current} />
                )}
              </div>
              {products && <ProductGallery products={products} />}
            </div>
          </div>
        </ActiveFiltersContextProvider>
      )}
    </>
  );
};

export default Products;
