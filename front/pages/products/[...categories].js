import ProductGallery from "root/features/products/listing/comps/gallery/gallery";
import ProductHeader from "root/features/products/listing/comps/product-header";
import ProductFilter from "root/features/products/listing/comps/filter/filter";
import SortGroup from "root/features/products/listing/comps/filter/sort-group";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCategoryContext } from "../../hooks/useCategoryContext";
import { useProductContext } from "../../hooks/useProductContext";

const Products = () => {
  const router = useRouter();
  const { categories: path = [] } = router.query;
  const { categories } = useCategoryContext();

  const context = useProductContext();
  const { allProducts, currentProducts } = context.products || {};
  const { dispatch } = context;

  const [currectCategory, setCurrentCategory] = useState();

  //displaying products from appropriate category
  useEffect(() => {
    if (!categories || !allProducts) {
      return;
    }

    const pathStr = path.join(",");
    let currCategory = null;
    categories.forEach((category) => {
      if (category.path == pathStr) {
        currCategory = category;
      }
    });

    if (!currCategory) {
      router.push("/404");
    } else {
      const productsFromCategory = allProducts.filter((p) => {
        const regex = new RegExp(`${pathStr}.*`, "g");
        return p.category.path.match(regex);
      });
      dispatch({
        type: "SET_PRODUCTS",
        payload: {
          allProducts: allProducts,
          currentProducts: productsFromCategory,
        },
      });
      setCurrentCategory(currCategory);
    }
  }, [path, categories, allProducts]);

  return (
    <div className="mt-5 ">
      <div className="mx-5">
        {/* <ProductHeader category={currectCategory} /> */}
        <div className="mt-5">{/* <SortGroup /> */}</div>
      </div>

      <hr className="mt-2 mb-4 splitter " />

      {allProducts && (
        <div className="d-flex ms-3 me-5">
          <div className="me-3">
            <ProductFilter products={allProducts} />
          </div>
          <ProductGallery products={allProducts} />
        </div>
      )}
    </div>
  );
};

export default Products;
