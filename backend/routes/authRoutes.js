// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// Public routes (no login needed)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route (must be logged in)
router.get("/profile", protect, getProfile);

module.exports = router;
