import { useEffect, useState } from "react";
import s from "./gallery.module.scss";
import ProductCard from "features/products/listing/comps/gallery/card";
import axios from "axios";

const Data = () => {
  //todo save likedProducts to localStorage
  const [likedProducts, setLikedProducts] = useState("");

  useEffect(() => {
    if (user) {
      const fetchLikedProducts = async () => {
        const token = user.token;

        try {
          const res = await axios.post(
            `/products/getByIds`,
            user.likedProducts,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setLikedProducts(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchLikedProducts();
    }
  }, [user]);

  return (
    <>
      {likedProducts && (
        <div className="container row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-3 gy-4">
          {activeFilters &&
            likedProducts.map((product) => {
              return (
                <div key={product._id} className="col">
                  <ProductCard
                    product={product}
                    like={() => {}}
                    isLiked={true}
                  />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Data;
