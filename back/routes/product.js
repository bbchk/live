import express from "express";
import { requireAuth, isAdmin } from "../middleware/auth.js";

import {
  getProductById,
  getProducts,
  getProductsByCategoryPath,
  getProductsByIds,
  createProduct,
  createProducts,
  updateProduct,
  deleteProduct,
  // deleteAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/:categoryPath/page/:pageId", getProductsByCategoryPath);

router.use(requireAuth);
router.post("/getbyIds", getProductsByIds);
router.use(isAdmin);
router.post("/", createProduct);
router.post("/many", createProducts);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
// router.delete("/deleteAllProducts", deleteAllProducts);

export { router as productsRoutes };
