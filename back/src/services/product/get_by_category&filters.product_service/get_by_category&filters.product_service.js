import Product from "#src/models/product.model.js";

import { getFilterMapFromStr, getFiltersMap } from "./utils/getFilters.js";
import { getOriginalFilterNameAndValues } from "./utils/getOrinialFilter.js";
import { intersectMaps } from "./utils/intersect.js";
import {
  getSubcategories,
  getCategoryBySlugPath,
} from "#src/services/category/get.category_service.js";
import { getAllFilterMaps } from "./utils/getAllFilterMaps.js";

//? if categoryPath is not changed from previous time, we can just use
//? product that we already have and filter them
//? todo bug fix when we have multiple filters and we have to intersect them, intersection is not enough, we need to add active options to the list as well
//? can we just query all products and then filter them

export async function getProductsByCategoryAndFilters(
  slugCategoryPath,
  filtersStr
) {
  const result = {};

  const activeCategory = await getCategoryBySlugPath(slugCategoryPath);
  const subcategories = await getSubcategories(activeCategory);
  const activeCategoriesIds = subcategories.map((c) => c._id);

  let filters = getFilterMapFromStr(filtersStr);

  let filtersMap = [];
  const ONLY_PAGE_FILTER = 1;
  if (filters.size > ONLY_PAGE_FILTER) {
    let allFilterMaps = await getAllFilterMaps(filters);
    filtersMap = intersectMaps(...allFilterMaps);
  } else {
    let allCategoryProducts = await Product.find({
      category: { $in: activeCategoriesIds },
    })
      .select("characteristics")
      .sort({ createdAt: -1 })
      .exec();

    filtersMap = getFiltersMap(allCategoryProducts, activeCategory);
  }
  result.filtersMap = Array.from(filtersMap.entries());

  /*Creating query for resulted products*/
  let query = Product.find({
    category: { $in: activeCategoriesIds },
  }).select("name price images characteristics");

  /*Applying filters to resulted products query*/
  for (let [filterName, filterValues] of filters) {
    if (filterName === "page") {
      continue;
    }

    if (filterName === "tsina") {
      query = query
        .where("price")
        .gte(filterValues[0])
        .lte(filterValues[1])
        .sort({ starRating: 1 });
    } else if (filterName === "sortuvannya") {
      if (filterValues[0] === "vid-deshevshykh-do-dorohykh") {
        query = query.sort({ price: 1 });
      } else if (filterValues[0] === "vid-dorohykh-do-deshevykh") {
        query = query.sort({ price: -1 });
      } else if (filterValues[0] === "za-reyutynhom") {
        query = query.sort({ starRating: 1 });
      }
    } else {
      const { originalFilterName, originalFilterValues } =
        getOriginalFilterNameAndValues(filterName, filterValues);
      query = query.where(`characteristics.${originalFilterName}`, {
        $in: originalFilterValues.map((value) => new RegExp(`^${value}$`, "i")),
      });
    }
  }

  const allProducts = await query.exec();
  /*Counting number of pages for all filtered products*/
  result.numPages = Math.max(1, Math.ceil(allProducts.length / 50));

  /*Counting max and min price of all category and filtered products*/
  let allCategoryProducts = await Product.find({
    category: { $in: activeCategoriesIds },
  })
    .select("name price")
    .sort({ createdAt: -1 })
    .exec();

  const categoryPrices = allCategoryProducts.map((p) => Number(p.price));
  const minPrice = categoryPrices.reduce((a, b) => Math.min(a, b), Infinity);
  const maxPrice = categoryPrices.reduce((a, b) => Math.max(a, b), -Infinity);
  result.minMaxPrice = [minPrice, maxPrice];

  const currentPrices = allProducts.map((p) => Number(p.price));
  const minCurrentPrice = currentPrices.reduce(
    (a, b) => Math.min(a, b),
    Infinity
  );
  const maxCurrentPrice = currentPrices.reduce(
    (a, b) => Math.max(a, b),
    -Infinity
  );
  result.currentMinMaxPrice = [minCurrentPrice, maxCurrentPrice];
  result.productsCount = allProducts.length;

  /*Filtering products by page*/
  let products = allProducts;
  const filterValues = filters.get("page");
  if (filterValues) {
    const pageId = filterValues[0];
    const PRODUCTS_ON_PAGE = 50;
    products = products.slice(
      PRODUCTS_ON_PAGE * (pageId - 1),
      PRODUCTS_ON_PAGE * pageId
    );
  }
  result.products = products;

  return result;
}
