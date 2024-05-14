import Product from '#src/models/product.model.js'

import {
  getFiltersMap,
  intersectMaps,
} from '#src/services/product/utils/get/filters/create/filters_map.util.js'
import { unslugifyFilter } from '#src/services/product/utils/get/filters/transform/unslugify_filter.util.js'

//todo refactor, use switch

const GENERIC_CATEGORY = {
  filters: ['Бренд', 'Країна реєстрації бренду', 'Країна-виробник товару'],
}

const createFilters = async (query, filters, activeCategory) => {
  if (!activeCategory) {
    //todo leaving search with only handful of generic filters, refactor later
    activeCategory = GENERIC_CATEGORY
  } else {
    //todo create unique filters for every category
    if (activeCategory.filters.length === 0) {
      activeCategory = GENERIC_CATEGORY
    }
  }

  async function getAllFilterMaps(query, filters) {
    const allFilterMaps = []

    for (let [slugKey, slugOptions] of filters) {
      if (slugKey === 'page') {
        continue
      }

      const { key, options } = unslugifyFilter({
        slugKey,
        slugOptions,
      })

      let characteristicsQuery = Product.find(query.getQuery()).select(
        'characteristics',
      )

      let filteredCharacteristics = []

      if (slugKey === 'tsina') {
        filteredCharacteristics = await characteristicsQuery
          .where('price')
          .gte(slugOptions[0])
          .lte(slugOptions[1])
          .exec()
      } else {
        const regexFilterValues = options.map(
          (value) => new RegExp(`^${value}$`, 'i'),
        )

        filteredCharacteristics = await characteristicsQuery
          .where(`characteristics.${key}`, {
            $in: regexFilterValues,
          })
          .exec()
      }

      const filterMap = getFiltersMap(filteredCharacteristics, activeCategory)

      if (slugKey !== 'tsina') {
        const allFilterValues = await Product.distinct(
          `characteristics.${key}`,
          query.getQuery(),
        )

        filterMap.set(key, allFilterValues)
      }

      allFilterMaps.push(filterMap)
    }

    return allFilterMaps
  }

  let filtersMap = []
  const ONLY_PAGE_FILTER = 1
  if (filters.size > ONLY_PAGE_FILTER) {
    let allFilterMaps = await getAllFilterMaps(query, filters)
    filtersMap = intersectMaps(...allFilterMaps)
  } else {
    let allProducts = await Product.find(query.getQuery())
      .select('characteristics')
      .sort({ createdAt: -1 })
      .exec()

    filtersMap = getFiltersMap(allProducts, activeCategory)
  }
  filtersMap = Array.from(filtersMap.entries())

  return filtersMap
}

export default createFilters
