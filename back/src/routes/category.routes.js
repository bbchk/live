import express from 'express'
import { requireAuth, isAdmin } from '../middleware/auth.js'

import { createCategory } from '#src/controllers/category/create.category_controller.js'

import { updateCategory } from '#src/controllers/category/update.category_controller.js'

import {
  getCategories,
  getRootCategories,
  getCategoryByPath,
  getDirectSubcategoriesByPath,
} from '#src/controllers/category/get.category_controller.js'

import cacheFor from '#src/middleware/cache.js'

const router = express.Router()
const chRouter = express.Router()

chRouter.get('/', getCategories)
chRouter.get('/root', getRootCategories)
chRouter.get('/category/by-path/:path', getCategoryByPath)
chRouter.get(
  '/subcategories/by-parent-category-path/:path',
  getDirectSubcategoriesByPath,
)

const TEN_MINUTES = 600
router.use(cacheFor(TEN_MINUTES), chRouter)

router.use(requireAuth, isAdmin)
router.post('/', createCategory)
router.patch('/:id', updateCategory)

export { router as categoryRoutes }
