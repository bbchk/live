import Product from '#src/models/product.model.js'
import { FILTERS } from '#src/services/product/utils/get/constants.js'
const { PRICE, PAGE } = FILTERS

import { getMapFromFilterStr } from '#src/services/product/utils/get/filters/create/filters_map.util.js'
import { getMinMaxPrice } from '#src/services/product/utils/get/products/misc/get_min_max_price.js'

import {
  filterBy,
  filterByPage,
  filterByPrice,
} from '#src/services/product/utils/get/filters/apply/apply_filters.util.js'
import { getNumPages } from '#src/services/product/utils/get/products/misc/get_num_pages.js'
import createFilters from '#src/services/product/utils/get/filters/create/create_filters.js'

async function processAndGatherData(
  productsQuery,
  filtersStr,
  activeCategory = null,
) {
  let filteredBy = getMapFromFilterStr(filtersStr)

  const filtersMap = await createFilters(
    productsQuery,
    filteredBy,
    activeCategory,
  )

  productsQuery = filterBy(productsQuery, filteredBy)

  let products = await productsQuery.exec()

  const minMaxPrice = getMinMaxPrice(products)

  const priceFilter = filteredBy.get(PRICE)
  if (priceFilter) products = filterByPrice(products, priceFilter)

  const productsCount = products.length
  const numPages = getNumPages(productsCount)

  const pageFilter = filteredBy.get(PAGE)
  if (pageFilter) products = filterByPage(products, pageFilter)

  return { products, filtersMap, productsCount, numPages, minMaxPrice }
  // return { products, productsCount, numPages, minMaxPrice }
}

export default processAndGatherData
