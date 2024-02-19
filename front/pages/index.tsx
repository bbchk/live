import { useEffect } from "react";
import CategoriesGallery from "root/features/categories/comps/gallery";

const Home = ({}) => {

  //todo useEffect to set categoriesPath of user to []
  
  
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


// export const getStaticProps = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/todos");
//   const data = await res.json();
//   console.log(data);

//   return {
//     props: { data },
//   };
// };
