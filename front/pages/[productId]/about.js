import { useRouter } from "next/router";

import Description from "../../features/products/landing/comps/description";
import ProductCard from "../../features/products/listing/comps/gallery/card";
import Navigation from "../../features/products/landing/comps/navigation";

import Characteristics from "../../features/products/landing/comps/characteristics";
import ReviewsList from "../../features/products/landing/comps/reviews-list";

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
