import express from 'express';
import { requireAuth, isAdmin } from '#src/middleware/auth.js';
import cacheFor from '#src/middleware/cache.js';

import {
  getProducts,
  getProductById,
  getProductsByIds,
  getProductsByCategoryAndFilters,
  getFilters,
} from '#src/controllers/product/get.product_controller.js';

import { createProduct } from '#src/controllers/product/create.product_controller.js';

import { updateProduct } from '#src/controllers/product/update.product_controller.js';

import { deleteProduct } from '#src/controllers/product/delete.product_controller.js';

const router = express.Router();
const chRouter = express.Router();

chRouter.get('/', getProducts);

chRouter.get('/by-ids', getProductsByIds);
chRouter.get('/product/by-id/:id', getProductById);
chRouter.get(
  '/by-category-path/:slugCategoryPath/filtered-by/:filtersStr?',
  getProductsByCategoryAndFilters,
);

chRouter.get('/filters/:slugCategoryPath/:filtersStr?', getFilters);

const ONE_MINUTE = 60;
router.use(cacheFor(ONE_MINUTE), chRouter);

router.use(requireAuth, isAdmin);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export { router as productsRoutes };
