import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ProductGallery from "features/products/listing/comps/gallery/gallery";
import ProductHeader from "features/products/listing/comps/product-header";
import ProductFilter from "features/products/listing/comps/filter/filter";
import SortGroup from "features/products/listing/comps/filter/sort-group";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

import SubcategoriesGallery from "features/products/listing/comps/subcategories/gallery";

import { addToCategoriesPath } from "store/categoriesSlice";

const Listing = ({ data: { category, subcategories, products, numPages } }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [activeProducts, setActiveProducts] = useState(products);
  // const [activeCategory, setActiveCategory] = useState(category);
  // const [activeSubcategories, setActiveSubcategories] = useState(subcategories);

  return (
    <>
      {!isLoading && (
        <div className="mt-3 ">
          <div className="mx-5">
            <>
              <ProductHeader category={category} />
              <SubcategoriesGallery subcategories={subcategories} />
            </>

            <div className="mt-5">
              <SortGroup />
            </div>
          </div>

          <hr className="mt-2 mb-4 splitter " />

          <div className="d-flex ms-3 me-5">
            <div className="me-3">
              {/* <ProductFilter products={activeProducts} /> */}
            </div>

            <ProductGallery
              activeProducts={products}
              activeCategory={category}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Listing;

async function getNumOfPages(slugCategoryPath) {
  const ALL_PAGES = 0;
  const res = await axios.get(
    `/products/${slugCategoryPath}/page/${ALL_PAGES}`
  );
  const { products } = res.data;

  let numPages = Math.ceil(products.length / 50);
  if (numPages == 0) {
    numPages += 1;
  }
  return numPages;
}

export async function getStaticPaths() {
  const fetchedCategories = await axios.get("/categories");
  const categories = fetchedCategories.data;

  const paths = [];

  for (const category of categories) {
    const slugCategoryPath = slugify(transliterate(category.path));

    const numPages = await getNumOfPages(slugCategoryPath);

    // Generate paths for each page
    for (let i = 1; i <= numPages; i++) {
      paths.push({
        params: {
          categories: `${slugCategoryPath}`,
          pageId: `${i}`,
          numPages: numPages,
        },
      });
    }
  }

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params } = context;
  const slugCategoryPath = params.categories;
  const pageId = params.pageId;

  const numPages = await getNumOfPages(slugCategoryPath);

  const res = await axios.get(`/products/${slugCategoryPath}/page/${pageId}`);
  const data = res.data;

  //todo make it a minutes
  const HALF_AN_HOUR_IN_SECONDS = 1800;
  return {
    props: { data: { ...data, numPages }, revalidate: HALF_AN_HOUR_IN_SECONDS },
  };
}
