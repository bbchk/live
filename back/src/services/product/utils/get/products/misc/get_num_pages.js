import { PRODUCTS_BY_PAGE } from '#src/services/product/utils/get/constants.js'

function getNumPages(productsCount) {
  return Math.max(1, Math.ceil(productsCount / PRODUCTS_BY_PAGE))
}

export { getNumPages }
