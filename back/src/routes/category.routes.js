import express from "express";
import { requireAuth, isAdmin } from "../middleware/auth.js";

import {
  createCategories,
  createCategory,
} from "#src/controllers/category/create.category_controller.js";

import { updateCategory } from "#src/controllers/category/update.category_controller.js";

import { getCategories } from "#src/controllers/category/get.category_controller.js";

const router = express.Router();

router.get("/", getCategories);

router.use(requireAuth, isAdmin);
router.post("/", createCategory);
router.post("/many", createCategories);
router.patch("/:id", updateCategory);

export { router as categoryRoutes };
