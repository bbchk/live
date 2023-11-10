import { useEffect } from "react";
import CategoriesGallery from "root/features/categories/comps/gallery";

const Home = () => {
  return (
    <div className="mt-4">
      <div className="my-5">
        <CategoriesGallery />
      </div>
      {/* <CarouselReviews /> */}
    </div>
  );
};

export default Home;
