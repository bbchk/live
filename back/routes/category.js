import express from "express";
import { requireAuth, isAdmin } from "../middleware/auth.js";

import {
  createCategories,
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);

router.use(requireAuth, isAdmin);
router.post("/", createCategory);
router.post("/many", createCategories);

export { router as categoryRoutes };
