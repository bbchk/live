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
import { useGetSubcategoriesOf } from "../../../hooks/useGetSubcategoriesOf";
import { useFindCategoryBySlugPath } from "../../../hooks/useFindCategoryByPath";
import axios from "axios";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeProducts, setActiveProducts] = useState(null);

  const { products: allProducts } = useSelector((state) => state.products);
  const { categories: allCategories, lastActiveCategory: activeCategory } =
    useSelector((state) => state.categories);

  const { getSubcategoriesOf } = useGetSubcategoriesOf();
  const { getActiveProducts } = useGetActiveProducts();

  //setting active products
  useEffect(() => {
    setIsLoading(true);

    if (activeCategory != null && allProducts != null) {
      const activeProducts = getActiveProducts(allProducts, activeCategory);

      setActiveProducts(activeProducts);
      setIsLoading(false);
    }
  }, [activeCategory, allProducts]);

  useEffect(() => {
    function foo() {
      if (activeProducts) {
        console.log(activeProducts.length);
        activeProducts.forEach(async (p) => {
          let lengthidx = 0;
          const category = p.category.reduce(
            (a, b) => (a.length > b.length ? a : b),
            {}
          );

          let newProduct = { ...p, category: [category._id] };
          console.log(newProduct);

          const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRlMmE4ZGU4MmU5OTZjM2JhOGRjNTEiLCJmaXJzdE5hbWUiOiJhbm90aGVyIiwic2Vjb25kTmFtZSI6IkJ1Y2hvayIsImVtYWlsIjoiYm9kaWFuYnVjaG9rQGdtYWlsLmNvbSIsImlhdCI6MTY5OTYyMTYyOX0.3HiuXKQozAYbhdp2kmAy9_yGah47GjGIaHVWLOD638s";
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };

          // const res = await axios
          //   .patch(`/products/${p._id}`, newProduct, config)
          //   .then((response) => {
          //     console.log(response.data);
          //   })
          //   .catch((error) => {
          //     console.error(error);
          //   });
        });
      }
    }
    foo();
  }, [activeProducts]);

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
              products={activeProducts}
              activeCategory={activeCategory}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
