import express from "express";
import { requireAuth, isAdmin } from "../middleware/auth.js";
import {
  signIn,
  signUp,
  destroy,
  deleteAllUsers,
  addLikedProduct,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);

router.use(requireAuth);
router.patch("/addLikedProduct", addLikedProduct);

router.use(isAdmin);
router.delete("/destroy", destroy);
router.delete("/deleteAllUsers", deleteAllUsers);

export { router as userRoutes };
