import { useRouter } from "next/router";

import Breadcrumbs from "root/features/products/landing/comps/breadcrumbs";
import Description from "root/features/products/landing/comps/description";
import ProductCard from "root/features/products/landing/comps/product-card";
import Navigation from "root/features/products/landing/comps/navigation";

import Characteristics from "root/features/products/landing/comps/characteristics";
import ReviewsList from "root/features/products/landing/comps/reviews-list";
import Decor from "root/features/products/landing/comps/decor";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Product = () => {
  const router = useRouter();

  //todo search in active Products collection, not in all the products
  const { products: allProducts } = useSelector((state) => state.products);
  const [activeProduct, setActiveProduct] = useState();

  useEffect(() => {
    if (allProducts) {
      const productId = router.query.productId;
      const activeProduct = allProducts.find(
        (product) => product._id === productId
      );
      setActiveProduct(activeProduct);
    }
    console.log(activeProduct);
  }, [allProducts]);

  return (
    <>
      {activeProduct && (
        <>
          {/* <Decor /> */}

          <div className="">
            <Breadcrumbs category={activeProduct.category} />
            <Navigation
              activePage={"about"}
              productId={router.query.productId}
            />
          </div>

          <div>
            <ProductCard product={activeProduct} />
            <div className="d-flex">
              <div className="w-50">
                <Description product={activeProduct} />
                <Characteristics product={activeProduct} />
              </div>
              {/* <ReviewsList /> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
