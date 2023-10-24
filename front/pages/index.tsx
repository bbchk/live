import CategoriesGallery from "@/features/categories/comps/gallery";

const Home = () => {
  const categories = [
    { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
    { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
    { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
    { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
    { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
    { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
    { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
    { name: "For dogs", imageUrl: "/photos/dog.jpeg" },
  ];
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
