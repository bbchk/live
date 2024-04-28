import express from "express";
import { requireAuth, isAdmin } from "../middleware/auth.js";

import { createCategory } from "#src/controllers/category/create.category_controller.js";

import { updateCategory } from "#src/controllers/category/update.category_controller.js";

import {
  getCategories,
  getCategoryByPath,
  getDirectSubcategoriesByPath,
} from "#src/controllers/category/get.category_controller.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:path", getCategoryByPath);

router.get("/subcategories/:path", getDirectSubcategoriesByPath);

router.use(requireAuth, isAdmin);
router.post("/", createCategory);
router.patch("/:id", updateCategory);

export { router as categoryRoutes };
