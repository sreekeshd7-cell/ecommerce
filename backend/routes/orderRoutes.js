// routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
} = require("../controllers/orderController");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/adminMiddleware");

router.post("/place", protect, placeOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/", protect, adminOnly, getAllOrders); // Admin: see all orders

module.exports = router;
