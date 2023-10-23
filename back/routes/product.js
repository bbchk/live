const express = require("express");
const router = express.Router();

const {
  createProduct,
  createProducts,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
} = require("../controllers/productController");

const { requireAuth, isAdmin } = require("../middleware/auth");

router.get("/", getProducts);
router.get("/:id", getProduct);

router.use(requireAuth);
router.use(isAdmin);
router.post("/createProduct", createProduct);
router.post("/createProducts", createProducts);
router.patch("/:id", updateProduct);
router.delete("/deleteAllProducts", deleteAllProducts);
router.delete("/:id", deleteProduct);

module.exports = router;
