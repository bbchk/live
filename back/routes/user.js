const express = require("express");
const router = express.Router();

const {
  signIn,
  signUp,
  destroy,
  deleteAllUsers,
  addLikedProduct,
} = require("../controllers/userController");
const { requireAuth, isAdmin } = require("../middleware/auth");

router.post("/signIn", signIn);
router.post("/signUp", signUp);

router.use(requireAuth);
router.patch("/addLikedProduct", addLikedProduct);

router.use(isAdmin);
router.delete("/destroy", destroy);
router.delete("/deleteAllUsers", deleteAllUsers);

module.exports = router;
