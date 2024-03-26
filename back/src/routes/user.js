import express from "express";
import { requireAuth } from "../middleware/auth.js";

import { signIn, signUp } from "#src/controllers/userController/auth.js";
import { addLikedProduct } from "#src/controllers/userController/like.js";
import { addToCart, syncCart } from "#src/controllers/userController/cart.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);

router.post("/cart/:userId/add/:productId", addToCart);
router.patch("/cart/:userId/sync", syncCart);

router.use(requireAuth);
router.patch("/like/:userId", addLikedProduct);

export { router as userRoutes };
