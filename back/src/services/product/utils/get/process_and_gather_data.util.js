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

async function processAndGatherData(dbQuery, filtersStr) {
  let filters = getMapFromFilterStr(filtersStr)

  dbQuery = filterBy(dbQuery, filters)

  let products = await dbQuery.exec()

  const minMaxPrice = getMinMaxPrice(products)

  const priceFilter = filters.get(PRICE)
  if (priceFilter) products = filterByPrice(products, priceFilter)

  const productsCount = products.length
  const numPages = getNumPages(productsCount)

  const pageFilter = filters.get(PAGE)
  if (pageFilter) products = filterByPage(products, pageFilter)

  return { products, productsCount, numPages, minMaxPrice }
}

export default processAndGatherData
