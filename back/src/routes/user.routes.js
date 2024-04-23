import express from "express";
import { requireAuth } from "../middleware/auth.js";

import {
  signIn,
  signUp,
} from "#src/controllers/user.controller/auth.user_controller.js";
import { addLikedProduct } from "#src/controllers/user.controller/like.user_controller.js";
import {
  addCartItem,
  syncCart,
  getCart,
  deleteCartItem,
} from "#src/controllers/user.controller/cart.user_controller.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);

router.use(requireAuth);

router.get("/cart/:userId/fetch", getCart);
router.patch("/cart/:userId/sync", syncCart);

router.post("/cart/:userId/add/:productId", addCartItem);
router.delete("/cart/:userId/delete/:productId", deleteCartItem);

router.patch("/like/:userId", addLikedProduct);

export { router as userRoutes };
