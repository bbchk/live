import CategoriesGallery from "features/categories/comps/gallery";
import Head from "next/head";
import axios from "axios";
import { useStopLoading } from "hooks/useStopLoading";

const Home = ({ flatCategoryMap }) => {
  const { loading } = useStopLoading();

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
  // console.time("fetch");
  const res = await axios.get(`/categories`);
  const allCategories = res.data;
  // console.timeEnd("fetch");

  // console.time("operate");
  const rootCategories = filterAndSort(allCategories);

  const flatCategoryMap = [];
  rootCategories.forEach((rootCat) =>
    flatCategoryMap.push(
      rootCat,
      ...findSubcategoriesOf(rootCat, allCategories)
    )
  );
  // console.timeEnd("operate");

  const HALF_AN_HOUR_IN_SECONDS = 1800;
  return {
    props: {
      flatCategoryMap: flatCategoryMap,
      revalidate: HALF_AN_HOUR_IN_SECONDS,
    },
  };
}

function filterAndSort(categories) {
  return categories
    .filter((category) => category.path.split(",").length === 1)
    .sort((a, b) => a.order - b.order);
}

function findSubcategoriesOf(rootCategory, categories) {
  const pathString = rootCategory.path;
  const regex = new RegExp(`^${pathString},[^,]+$`);
  return categories
    .filter(
      (category) => category.path.match(regex) && category.path !== pathString
    )
    .slice(0, 5);
}
