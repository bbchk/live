import { useEffect, useState } from "react";
import { useAddLikedProduct } from "root/hooks/useAddLikedProduct.js";

import { useAuthContext } from "root/hooks/useAuthContext";
import ProductCard from "./card";

const ProductGallery = ({ products }) => {
  const { user } = useAuthContext();
  const [likedProducts, setLikedProducts] = useState([]);
  const { likeProduct, error } = useAddLikedProduct();

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
    if (user && likedProducts.length === 0) {
      setLikedProducts(user.likedProducts);
    }
  }, [user]);

  return (
    <div className="container row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-3 gy-4">
      {products &&
        products.map((product) => {
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
