import axios from "axios";
import Head from "next/head";

import { useStopLoading } from "hooks/useStopLoading";

import { useUpdateFilters } from "features/products/listing/hooks/use_update_filters";
import { useDispatchInitialFilters } from "features/products/listing/hooks/use_dispatch_initial_filters.js";
import { usePageValidation } from "features/products/listing/hooks/use_page_validation";

import ListingHeader from "features/products/listing/comps/listing_header";
import SubcategoriesGallery from "features/products/listing/comps/subcategories/gallery";
import ProductListingBody from "features/products/listing/comps/product_listing_body";

const Listing = ({ data }) => {
  const {
    activeCategory: category,
    directSubcategories: subcategories,
    numPages,
  } = data;

  useStopLoading();
  usePageValidation(numPages);

  useDispatchInitialFilters();

  useUpdateFilters();

  return (
    <>
      <Head>
        <title>{`Живий світ | ${category.path}`}</title>
        <meta name="description" content={`Живий Світ | ${category.path}`} />
      </Head>

      <>
        <>
          <ListingHeader category={category} />
          <SubcategoriesGallery subcategories={subcategories} />
        </>

        <div id="main_content">
          <ProductListingBody data={data} />
        </div>
      </>
    </>
  );
};

export default Listing;

export async function getServerSideProps(context) {
  const { categoryPath, filtersStr } = context.params;

  const endpoints = {
    products: `/products/by-category-path/${categoryPath}/filtered-by/${filtersStr}`,
    activeCategory: `/categories/category/by-path/${categoryPath}`,
    directSubcategories: `/categories/subcategories/by-parent-category-path/${categoryPath}`,
    filters: `/products/filters/${categoryPath}/${filtersStr}`,
  };

  try {
    const products = await fetchData(endpoints.products);
    const activeCategory = await fetchData(endpoints.activeCategory);
    const directSubcategories = await fetchData(endpoints.directSubcategories);
    const filtersMap = await fetchData(endpoints.filters);

    const HALF_AN_HOUR = 1800; // 30 minutes
    return {
      props: {
        data: {
          activeCategory,
          directSubcategories,
          filtersMap,
          ...products,
          page: filtersStr.match(/page=(\d+)/)[1] || 1,
        },
        revalidate: HALF_AN_HOUR,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}

async function fetchData(url) {
  const response = await axios.get(url);
  return response.data;
}
