import { useEffect, useState } from "react";
import s from "./gallery.module.scss";
import ProductCard from "root/features/products/listing/comps/gallery/card";

const Data = () => {
  //todo save likedProducts to localStorage
  const [likedProducts, setLikedProducts] = useState("");

  useEffect(() => {
    if (user) {
      const fetchLikedProducts = async () => {
        const token = user.token;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products/getByIds`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user.likedProducts),
          }
        );

        const json = await res.json();

        if (res.ok) {
          setLikedProducts(json);
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
