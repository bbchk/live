import { useDeferredValue, useEffect, useRef, useState } from "react";

import ProductCard from "./card";
import { useActiveFiltersContext } from "../../hooks/useActiveFiltersContext";

const ProductGallery = ({ products }) => {
  const { activeFilters } = useActiveFiltersContext();
  const [activeProducts, setActiveProducts] = useState(products);

  //todo measure perfomance
  //todo refactor
  useEffect(() => {
    if (activeFilters && activeProducts) {
      let filteredProducts = products;

      Object.keys(activeFilters).forEach((prop) => {
        if (activeFilters[prop].length !== 0) {
          //getting all products that have the same options values as the filter
          const filteredByProp = filteredProducts.filter((product) => {
            return activeFilters[prop].includes(product[prop]);
          });
          //making intersection on the filtered products and the products that have the same options values as the filter
          filteredProducts = filteredProducts.filter((p) =>
            filteredByProp.includes(p)
          );
        }
      });

      setActiveProducts(filteredProducts);
    }
  }, [activeFilters]);

  return (
    <div className="container row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-3 gy-4">
      {activeFilters &&
        activeProducts.map((product) => {
          return (
            <div key={product._id} className="col">
              <ProductCard product={product} like={() => {}} isLiked={false} />
            </div>
          );
        })}
    </div>
  );
};

export default ProductGallery;
