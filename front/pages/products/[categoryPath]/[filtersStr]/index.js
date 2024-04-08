import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ProductGallery from "features/products/listing/comps/gallery/gallery";

import SortGroup from "features/products/listing/comps/filter/sort-group";
import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

import SubcategoriesGallery from "features/products/listing/comps/subcategories/gallery";

import { addToCategoriesPath } from "store/categoriesSlice";
import Head from "next/head";

import { useGenFilterStr } from "hooks/genFilterStr";
import { setFilters } from "store/filtersSlice";
import { useGetFilterMapFromStr } from "hooks/useGetFilterMapFromStr";
import ProductListingBody from "features/products/listing/product_listing_body";
import ListingHeader from "../../../../features/products/listing/comps/listing_header";
import { stopLoading } from "store/modalSlice.js";

const Listing = ({
  data: {
    activeCategory: category,
    subcategories,
    products,
    productsCount,
    numPages,
    filtersMap,
    minMaxPrice,
    currentMinMaxPrice,
    page,
  },
}) => {
  //todo indefinite products tscrooling
  const router = useRouter();
  const dispatch = useDispatch();
  const { categoryPath, filtersStr } = router.query;
  const { filters } = useSelector((state) => state.filters);
  const { loading } = useSelector((state) => state.modals);

  const { getFilterMapFromStr } = useGetFilterMapFromStr();
  const { genFiltersStr } = useGenFilterStr();

  useEffect(() => {
    if (loading) {
      dispatch(stopLoading());
    }
  }, [router.query]);

  useEffect(() => {
    const { filtersStr } = router.query;

    const match = filtersStr.match(/page=(\d+)/);
    const pageValue = match ? match[1] : null;

    if (pageValue > numPages || pageValue < 1) {
      router.push(`/404`);
    }
  }, [router.query]);

  useEffect(() => {
    const filtersMap = getFilterMapFromStr(filtersStr);
    dispatch(setFilters(filtersMap));

    return () => {
      dispatch(setFilters({}));
    };
  }, []);

  //todo fetch filtered products on client side
  useEffect(() => {
    let newFiltersStr = genFiltersStr(filters);

    if (Object.keys(filters).length != 0 && newFiltersStr != filtersStr) {
      const filtersStrPageDefault = newFiltersStr.replace(/page=\d+/, "page=1");

      router
        .push(`/products/${categoryPath}/${filtersStrPageDefault}`)
        .catch((error) =>
          console.error("An error occurred during route transition: ", error)
        );
    }
  }, [filters]);

  //todo collect filters only on first render of page
  // const [isLoading, setIsLoading] = useState(false);
  // const [activeProducts, setActiveProducts] = useState(products);
  // const [activeCategory, setActiveCategory] = useState(category);
  // const [activeSubcategories, setActiveSubcategories] = useState(subcategories);

  return (
    <>
      <Head>
        <title>{`Живий світ | ${category.path}`}</title>
        <meta name="description" content={`Живий Світ | ${category.path}`} />
      </Head>
      {/* {!isLoading && ( */}
      <div>
        <div>
          <ListingHeader category={category} />
          <SubcategoriesGallery subcategories={subcategories} />
        </div>
        <ProductListingBody
          filtersMap={filtersMap}
          minMaxPrice={minMaxPrice}
          currentMinMaxPrice={currentMinMaxPrice}
          products={products}
          productsCount={productsCount}
          category={category}
          numPages={numPages}
          page={page}
        />
      </div>
      {/* )} */}
    </>
  );
};

export default Listing;

export async function getServerSideProps(context) {
  const { categoryPath, filtersStr } = context.params;

  try {
    //todo filterStr validation
    const res = await axios.get(`/products/${categoryPath}/${filtersStr}`);
    const data = res.data;

    let page = 1;
    const match = filtersStr.match(/page=(\d+)/);
    if (match) {
      page = filtersStr.match(/page=(\d+)/)[1];
    }

    //todo make it a minutes for production
    const HALF_AN_HOUR_IN_SECONDS = 1800;
    return {
      props: { data: { ...data, page }, revalidate: HALF_AN_HOUR_IN_SECONDS },
    };
  } catch (e) {
    console.error("An error occurred while fetching product data: ", e);
    return { notFound: true };
  }
}
