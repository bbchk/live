import { useEffect, useState } from "react";
import { useAddLikedProduct } from "root/hooks/useAddLikedProduct.js";

import { useAuthContext } from "root/hooks/useAuthContext";
import ProductCard from "./card";
import { useRouter } from "next/router";
import { useCategoryContext } from "../../../../../hooks/useCategoryContext";
import { useProductContext } from "../../../../../hooks/useProductContext";

const ProductGallery = ({ products }) => {
  const { user } = useAuthContext();
  const [likedProducts, setLikedProducts] = useState([]);
  const { likeProduct, error } = useAddLikedProduct();

  const [currectCategory, setCurrentCategory] = useState();

  const router = useRouter();
  const { categories: path = [] } = router.query;
  const { categories } = useCategoryContext();

  const context = useProductContext();
  const { allProducts, currentProducts } = context.products || {};
  const { dispatch } = context;

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
      console.log(context.products);
      setCurrentCategory(currCategory);
    }
  }, [path, categories, allProducts]);

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
      {currentProducts &&
        currentProducts.map((product) => {
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
