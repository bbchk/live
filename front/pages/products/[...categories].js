import ProductGallery from "root/features/products/listing/comps/gallery/gallery";
import ProductHeader from "root/features/products/listing/comps/product-header";
import ProductFilter from "root/features/products/listing/comps/filter/filter";
import SortGroup from "root/features/products/listing/comps/filter/sort-group";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { useGetActiveProducts } from "../../features/products/listing/hooks/useGetActiveProducts";
import { useCategoryContext } from "../../hooks/useCategoryContext";
import { useProductContext } from "../../hooks/useProductContext";

const Products = () => {
  const router = useRouter();
  const { categories: path = [] } = router.query;
  const { getProducts } = useGetActiveProducts();

  const { categories } = useCategoryContext();

  const { products: allProducts, dispatch } = useProductContext();

  const [products, setProducts] = useState(null);
  const productsref = useRef();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categories && allProducts) {
      console.log(path);
      const activeProducts = getProducts(allProducts, categories, path);
      setProducts(activeProducts);
      productsref.current = activeProducts;
      setIsLoading(false);
      // console.log(activeProducts);
      // console.log(productsref.current);
      // console.log(products);
    }
  }, [path, categories, allProducts]);

  return (
    <>
      {!isLoading && (
        <div className="mt-5 ">
          <div className="mx-5">
            {/* <ProductHeader category={currectCategory} /> */}
            <div className="mt-5">{/* <SortGroup /> */}</div>
          </div>

          <hr className="mt-2 mb-4 splitter " />

          <div className="d-flex ms-3 me-5">
            <div className="me-3">
              <ProductFilter products={productsref.current} set={setProducts} />
            </div>
            {products && <ProductGallery products={products} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
