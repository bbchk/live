import Product from "#src/models/product.model.js";
import {
  getCategoryBySlugPath,
  getSubcategories,
} from "../../category/get.category_service.js";

import {
  getMapFromFilterStr,
  getFiltersMap,
  intersectMaps,
} from "./utils/filters_map.util.js";
import { unslugifyFilter } from "./utils/unslugify_filter.util.js";

export async function getAllFilterMaps(filters) {
  const allFilterMaps = [];

  for (let [filterName, filterValues] of filters) {
    if (filterName === "page") {
      continue;
    }

    const { originalFilterName, originalFilterValues } = unslugifyFilter({
      filterName,
      filterValues,
    });

    let characteristicsQuery = Product.find({
      category: { $in: activeCategoriesIds },
    }).select("characteristics");

    let filteredCharacteristics = [];

    if (filterName === "tsina") {
      filteredCharacteristics = await characteristicsQuery
        .where("price")
        .gte(filterValues[0])
        .lte(filterValues[1])
        .exec();
    } else {
      const regexFilterValues = originalFilterValues.map(
        (value) => new RegExp(`^${value}$`, "i")
      );

      filteredCharacteristics = await characteristicsQuery
        .where(`characteristics.${originalFilterName}`, {
          $in: regexFilterValues,
        })
        .exec();
    }

    const filterMap = getFiltersMap(filteredCharacteristics, activeCategory);

    if (filterName !== "tsina") {
      const allFilterValues = await Product.distinct(
        `characteristics.${originalFilterName}`,
        {
          category: { $in: activeCategoriesIds },
        }
      );

      filterMap.set(originalFilterName, allFilterValues);
    }

    allFilterMaps.push(filterMap);
  }
  return allFilterMaps;
}

export const getFiltersS = async (slugCategoryPath, filtersStr) => {
  const activeCategory = await getCategoryBySlugPath(slugCategoryPath);
  const subcategories = await getSubcategories(activeCategory);
  const activeCategoriesIds = subcategories.map((c) => c._id);

  let filters = getMapFromFilterStr(filtersStr);

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
  filtersMap = Array.from(filtersMap.entries());

  return filtersMap;
};
