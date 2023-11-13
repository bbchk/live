import { useDeferredValue, useEffect, useRef, useState } from "react";
import { useAddLikedProduct } from "root/hooks/useAddLikedProduct.js";

import { useAuthContext } from "root/hooks/useAuthContext";
import ProductCard from "./card";
import { useActiveFiltersContext } from "../../hooks/useActiveFiltersContext";

const ProductGallery = ({ products }) => {
  const { user } = useAuthContext();
  const [likedProducts, setLikedProducts] = useState([]);
  const { likeProduct, error } = useAddLikedProduct();

  const { activeFilters, dispatch } = useActiveFiltersContext();
  const [activeProducts, setActiveProducts] = useState(products);

  const like = async (_id) => {
    await likeProduct(_id).then(() => {
      if (error) {
        console.log(error);
      } else {
        setLikedProducts((prevLikedProducts) => [...prevLikedProducts, _id]);
      }
    });
  };

  useEffect(() => {
    if (activeFilters && activeProducts) {
      let filteredProducts = [];

      activeFilters.forEach((filter) => {
        filteredProducts.push(...products.filter(filter.f));
      });

      // if (filteredProducts.size == 0) {
      //   filteredProducts.add(...products);
      //   //todo
      // }

      setActiveProducts(filteredProducts);
    }
  }, [activeFilters]);

  useEffect(() => {
    if (user && likedProducts.length === 0) {
      setLikedProducts(user.likedProducts);
    }
  }, [user]);

  return (
    <div className="container row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-3 gy-4">
      {activeFilters &&
        activeProducts.map((product) => {
          return (
            <div key={product._id} className="col">
              <ProductCard
                product={product}
                like={like}
                isLiked={likedProducts?.includes(product._id)}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ProductGallery;
