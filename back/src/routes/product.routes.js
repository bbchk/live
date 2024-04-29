import express from "express";
import { requireAuth, isAdmin } from "../middleware/auth.js";

import {
  getProducts,
  getProductById,
  getProductsByIds,
  getProductsByCategoryAndFilters,
  getFilters,
} from "#src/controllers/product/get.product_controller.js";

import { createProduct } from "#src/controllers/product/create.product_controller.js";

import { updateProduct } from "#src/controllers/product/update.product_controller.js";

import { deleteProduct } from "#src/controllers/product/delete.product_controller.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/by-ids", getProductsByIds);
router.get("/product/by-id/:id", getProductById);
router.get(
  "/by-category-path/:slugCategoryPath/filtered-by/:filtersStr?",
  getProductsByCategoryAndFilters
);

router.get("/filters/:slugCategoryPath/:filtersStr?", getFilters);

router.use(requireAuth, isAdmin);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export { router as productsRoutes };
