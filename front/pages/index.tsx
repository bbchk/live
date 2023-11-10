import { useEffect } from "react";
import CategoriesGallery from "root/features/categories/comps/gallery";
import { useCategoryContext } from "root/hooks/useCategoryContext";
import { useProductContext } from "root/hooks/useProductContext";

const Home = () => {
  const { categories } = useCategoryContext();

  // const categories = [
  //   { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
  //   { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
  //   { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
  //   { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
  //   { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
  //   { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
  //   { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
  //   { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
  // ];

  return (
    <div className="mt-4">
      <div className="my-5">
        <CategoriesGallery categories={categories} />
      </div>
      {/* <CarouselReviews /> */}
    </div>
  );
};

export default Home;
