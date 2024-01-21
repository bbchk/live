import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "./card";
// import { useActiveFiltersContext } from "../../hooks/useActiveFiltersContext";

const ProductGallery = ({ products }) => {
  // const { minMaxPrice, sortBy, activeFilters } = useActiveFiltersContext();
  const [activeProducts, setActiveProducts] = useState(products);
  const productsFilteredByChecks = useRef([]);

  // //filter sort group
  // useEffect(() => {
  //   if (sortBy != null) {
  //     const sortedProducts = [...activeProducts].sort((a, b) => {
  //       if (sortBy === "price_asc") {
  //         return a.price - b.price;
  //       } else if (sortBy === "price_dsc") {
  //         return b.price - a.price;
  //       }
  //     });
  //     setActiveProducts(sortedProducts);
  //   }
  // }, [sortBy]);

  // //filter price
  // useEffect(() => {
  //   const [minPrice, maxPrice] = minMaxPrice;
  //   if (minPrice != -Infinity || maxPrice != Infinity) {
  //     const filteredProducts = productsFilteredByChecks.current.filter(
  //       (product) => {
  //         return product.price >= minPrice && product.price <= maxPrice;
  //       }
  //     );
  //     setActiveProducts(filteredProducts);
  //   }
  // }, [minMaxPrice]);

  // //todo measure perfomance
  // //todo refactor
  // //filter checks
  // useEffect(() => {
  //   if (activeFilters && activeProducts) {
  //     let filteredProducts = products;

  //     Object.keys(activeFilters).forEach((prop) => {
  //       if (activeFilters[prop].length !== 0) {
  //         //getting all products that have the same options values as the filter
  //         const filteredByProp = filteredProducts.filter((product) => {
  //           return activeFilters[prop].includes(product[prop]);
  //         });
  //         //making intersection on the filtered products and the products that have the same options values as the filter
  //         filteredProducts = filteredProducts.filter((p) =>
  //           filteredByProp.includes(p)
  //         );
  //       }
  //     });

  //     setActiveProducts(filteredProducts);
  //     productsFilteredByChecks.current = filteredProducts;
  //   }
  // }, [activeFilters]);

  const router = useRouter();

  return (
    <div className="container row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-3 gy-4">
      {activeProducts &&
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
