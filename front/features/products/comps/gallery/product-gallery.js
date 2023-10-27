import { useEffect, useState } from "react";
import { useAddLikedProduct } from "@/hooks/useAddLikedProduct.js";

import { useAuthContext } from "@/hooks/useAuthContext";
import ProductCard from "./product-card";

const ProductGallery = () => {
  const [products, setProducts] = useState(null);
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

  //todo substitude with productContext!
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:4000/products");
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-3 gy-4">
      {products &&
        products.map(
          ({
            _id,
            name,
            brand,
            price,
            isAvailable,
            starRating,
            packing,
            description,
            imageUrl,
          }) => {
            return (
              <div key={_id} className="col">
                <ProductCard
                  _id={_id}
                  name={name}
                  brand={brand}
                  price={price}
                  isAvailable={isAvailable}
                  starRating={starRating}
                  packing={packing}
                  description={description}
                  imageUrl={imageUrl}
                  like={like}
                  isLiked={likedProducts?.includes(_id)}
                />
              </div>
            );
          }
        )}
    </div>
  );
};

export default ProductGallery;
