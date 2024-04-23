import Product from "#src/models/product.model.js";

import {
  getMapFromFilterStr,
  getFiltersMap,
} from "./utils/filters_map.util.js";
import { unslugifyFilter } from "./utils/unslugify_filter.util.js";

import {
  getSubcategories,
  getCategoryBySlugPath,
} from "#src/services/category/get.category_service.js";
import { getFiltersS } from "./get_filters.product_service.js";
import { get } from "mongoose";

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

  let filters = getMapFromFilterStr(filtersStr);

  /*Creating query for resulted products*/
  let query = Product.find({
    category: { $in: activeCategoriesIds },
  }).select("name price images characteristics");

  /*Applying filters to resulted products query*/
  // console.log(filters);

  filters.forEach((options, key) => {
    if (!key === "page") {
      if (key === "tsina") {
        query = query
          .where("price")
          .gte(options[0])
          .lte(options[1])
          .sort({ starRating: 1 });
      } else if (key === "sortuvannya") {
        switch (options[0]) {
          case "vid-deshevshykh-do-dorohykh":
            query = query.sort({ price: 1 });
            break;
          case "vid-dorohykh-do-deshevykh":
            query = query.sort({ price: -1 });
            break;
          case "za-reyutynhom":
            query = query.sort({ starRating: 1 });
            break;
        }
      } else {
        const { key: unslugifiedKey, options: unslugifiedOptions } =
          unslugifyFilter({
            key,
            options,
          });

        query = query.where(`characteristics.${unslugifiedKey}`, {
          $in: unslugifiedOptions.map((o) => new RegExp(`^${o}$`, "i")),
        });
      }
    }
  });

  const allProducts = await query.exec();

  result.productsCount = allProducts.length;
  result.numPages = getNumberOfPages(allProducts);
  result.minMaxPrice = getMinMaxPrice(allProducts);

  /*Filtering products by page*/
  let products = allProducts;
  const filterValues = filters.g1et("page");
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

function getNumberOfPages(products) {
  const PRODUCTS_ON_PAGE = 50;
  return Math.max(1, Math.ceil(products.length / PRODUCTS_ON_PAGE));
}

function getMinMaxPrice(products) {
  // const currentPrices = allProducts.map((p) => Number(p.price));
  // const minCurrentPrice = currentPrices.reduce(
  //   (a, b) => Math.min(a, b),
  //   Infinity
  // );
  // const maxCurrentPrice = currentPrices.reduce(
  //   (a, b) => Math.max(a, b),
  //   -Infinity
  // );
  // result.currentMinMaxPrice = [minCurrentPrice, maxCurrentPrice];

  const prices = products.map((p) => Number(p.price));
  const minPrice = prices.reduce((a, b) => Math.min(a, b), Infinity);
  const maxPrice = prices.reduce((a, b) => Math.max(a, b), -Infinity);
  return [minPrice, maxPrice];
}
