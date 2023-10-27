import { useRouter } from "next/router";

import Navigation from "root/features/products/comps/mutual/navigation";
import ReviewsList from "root/features/products/comps/mutual/reviews-list";

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
