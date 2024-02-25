import { useEffect } from "react";
import CategoriesGallery from "features/categories/comps/gallery";
import Head from "next/head";

const Home = ({}) => {

  //todo useEffect to set categoriesPath of user to []
  
  
  return (
    <>
    <Head>
        <title> Живий світ | Про нас </title>
        <meta
          name="description"
          content="Живий Світ - Магазин найкращих товарів для вашого дому, домашніх улюбленців та рослин"
        />
      </Head>
    
    <div className="mt-4">
      <div className="my-5">
        <CategoriesGallery />
      </div>
      {/* <CarouselReviews /> */}
    </div>
    </>
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
