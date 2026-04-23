// routes/productRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/adminMiddleware");

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin-only routes (must be logged in AND be admin)
router.post("/", protect, adminOnly, createProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
