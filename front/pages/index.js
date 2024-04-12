import CategoriesGallery from "features/categories/comps/gallery";
import Head from "next/head";
import axios from "axios";

const Home = ({ flatCategoryMap }) => {
  //todo useEffect to set categoriesPath of user to []

  return (
    <>
      <Head>
        <title>
          Живий Світ: товари для саду, городу та домашніх улюбленців
        </title>
        <meta
          name="description"
          content="Живий Світ: товари для саду, городу та домашніх улюбленців. Найкраще для вас у магазині Живий Світ!"
        />
      </Head>

      <div className="my-5">
        <CategoriesGallery flatCategoryMap={flatCategoryMap} />
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await axios.get(`/categories`);
  const categories = res.data;

  const rootCategories = categories
    .filter((category) => category.path.split(",").length == 1)
    .sort((a, b) => a.order - b.order);

  //we cannot return js map from getStaticProps, use array
  const flatCategoryMap = [];

  rootCategories.forEach((c) => {
    const pathString = c.path;
    const regex = new RegExp(`^${pathString},[^,]+$`);
    const subcategories = categories
      .filter((c) => {
        return c.path.match(regex) && c.path !== pathString;
      })
      .slice(0, 5);
    flatCategoryMap.push(c, ...subcategories);
  });

  const HALF_AN_HOUR_IN_SECONDS = 1800;
  return {
    props: {
      flatCategoryMap: flatCategoryMap,
      revalidate: HALF_AN_HOUR_IN_SECONDS,
    },
  };
}
