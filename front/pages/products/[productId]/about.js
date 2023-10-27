import { useRouter } from "next/router";

import Description from "@/features/products/comps/about/description";
import ProductCard from "@/features/products/comps/about/product-card";

import Navigation from "@/features/products/comps/mutual/navigation";
import Characteristics from "@/features/products/comps/mutual/characteristics";
import ReviewsList from "@/features/products/comps/mutual/reviews-list";

const Product = () => {
  const router = useRouter();
  return (
    <>
      <div className="mt-5">
        <Navigation activePage={"about"} productId={router.query.productId} />
      </div>
      <div>
        <ProductCard />
        <div className="d-flex">
          <div className="w-50">
            <Description />
            <Characteristics />
          </div>
          <ReviewsList />
        </div>
      </div>
    </>
  );
};

export default Product;
