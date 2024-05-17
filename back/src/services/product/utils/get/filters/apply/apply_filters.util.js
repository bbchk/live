import { PRODUCTS_BY_PAGE } from '#src/services/product/utils/get/constants.js'

import { unslugifyFilter } from '#src/services/product/utils/get/filters/transform/unslugify_filter.util.js'

function filterBy(query, filters) {
  /*Applying filters to resulted products query*/
  filters.forEach((slugOptions, slugKey) => {
    switch (slugKey) {
      case 'page':
      case 'tsina':
        break
      case 'sortuvannya':
        switch (slugOptions[0]) {
          case 'vid-deshevshykh-do-dorohykh':
            query = query.sort({ price: 1 })
            break
          case 'vid-dorohykh-do-deshevykh':
            query = query.sort({ price: -1 })
            break
          case 'za-reyutynhom':
            query = query.sort({ starRating: 1 })
            break
        }
        break
      default: {
        const { key: unslugifiedKey, options: unslugifiedOptions } =
          unslugifyFilter({
            slugKey,
            slugOptions,
          })

        query = query.where(`characteristics.${unslugifiedKey}`, {
          $in: unslugifiedOptions.map((o) => new RegExp(`^${o}$`, 'i')),
        })
        break
      }
    }
  })

  return query
}

function filterByPrice(products, filter) {
  return products.filter((p) => p.price >= filter[0] && p.price <= filter[1])
}

function filterByPage(products, filter) {
  const pageId = filter[0]

  return products.slice(
    PRODUCTS_BY_PAGE * (pageId - 1),
    PRODUCTS_BY_PAGE * pageId,
  )
}

export { filterBy, filterByPrice, filterByPage }
