import express from "express";
import { requireAuth, isAdmin } from "../middleware/auth.js";

import {
  getProduct,
  getProducts,
  getProductsByIds,
  createProduct,
  createProducts,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

router.use(requireAuth);
router.post("/getbyIds", getProductsByIds);
router.use(isAdmin);
router.post("/", createProduct);
router.post("/many", createProducts);
router.patch("/:id", updateProduct);
router.delete("/deleteAllProducts", deleteAllProducts);
router.delete("/:id", deleteProduct);

export { router as productsRoutes };
