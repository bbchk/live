import { useRouter } from "next/router";

import Navigation from "../../features/products/landing/comps/navigation";
import ReviewsList from "../../features/products/landing/comps/reviews-list";

const Reviews = () => {
  const router = useRouter();

  return (
    <>
      <div className="mt-5">
        <Navigation activePage={"reviews"} productId={router.query.productId} />
      </div>
      <div>
        <ReviewsList />
      </div>
    </>
  );
};

export default Reviews;
