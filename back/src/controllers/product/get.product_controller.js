import * as products from '#src/services/product/get.product_service.js'
import { asyncErrorHandler } from '#src/utils/async_error_handler.js'

//todo validation
export const all = asyncErrorHandler(async (req, res, next) => {
  const result = await products.getProducts()
  res.status(200).json(result)
})

export const keywordsByCategoryId = asyncErrorHandler(
  async (req, res, next) => {
    const { catId } = req.params
    const result = await products.getKeywordsByCategory(catId)

    res.status(200).json(result)
  },
)

export const byId = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params
  const result = await products.getProductById(id)

  res.status(200).json(result)
})

export const byIds = asyncErrorHandler(async (req, res, next) => {
  const productIds = req.query.ids.split(',')
  const result = await products.getProductsByIds(productIds)

  res.status(200).json(result)
})

export const byQuery = asyncErrorHandler(async (req, res, next) => {
  const { query, filtersStr } = req.params
  const result = await products.getByQuery(query, filtersStr)

  res.status(200).json(result)
})

export const byCategoryAndFilters = asyncErrorHandler(
  async (req, res, next) => {
    let { slugCategoryPath, filtersStr } = req.params

    const result = await products.getByCategoryAndFilters(
      slugCategoryPath,
      filtersStr,
    )

    return res.status(200).json(result)
  },
)

// export const filters = asyncErrorHandler(async (req, res, next) => {
//   let { slugCategoryPath, filtersStr } = req.params

//   try {
//     const result = await productsFilterService.getFiltersS(
//       slugCategoryPath,
//       filtersStr,
//     )

//     return res.status(200).json(result)
//   } catch (err) {
//     return res.status(500).json({ error: err.message })
//   }
// })
