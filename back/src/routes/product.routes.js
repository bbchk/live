import express from 'express'
import { requireAuth, isAdmin } from '#src/middleware/auth.js'
import cacheFor from '#src/middleware/cache.js'

import * as products from '#src/controllers/product/export.js'

const router = express.Router()
const chRouter = express.Router()

chRouter.get('/', products.get.all)
chRouter.get('/by-ids', products.get.byIds)

chRouter.get('/keywords/by-cat-id/:catId', products.get.keywordsByCategoryId)

chRouter.get('/product/by-id/:id', products.get.byId)

chRouter.get('/by-query/:query/filtered-by/:filtersStr?', products.get.byQuery)
chRouter.get(
  '/by-category-path/:slugCategoryPath/filtered-by/:filtersStr?',
  products.get.byCategoryAndFilters,
)

const ONE_MINUTE = 60
router.use(cacheFor(ONE_MINUTE), chRouter)

router.use(requireAuth, isAdmin)
router.post('/', products.create.product)
router.patch('/:id', products.update.byId)
router.delete('/:id', products.remove.byId)

export { router as productsRoutes }
