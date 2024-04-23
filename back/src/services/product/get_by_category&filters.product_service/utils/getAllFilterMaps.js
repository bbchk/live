import Product from "#src/models/product.model.js";

import { getFilterMapFromStr, getFiltersMap } from "./getFilters.js";
import { getOriginalFilterNameAndValues } from "./getOrinialFilter.js";

export async function getAllFilterMaps(filters) {
  const allFilterMaps = [];

  for (let [filterName, filterValues] of filters) {
    if (filterName === "page") {
      continue;
    }

    const { originalFilterName, originalFilterValues } =
      getOriginalFilterNameAndValues(filterName, filterValues);

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
