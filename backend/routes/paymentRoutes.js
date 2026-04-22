// routes/paymentRoutes.js
const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
const { protect } = require("../middleware/auth");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
router.post("/create-order", protect, async (req, res) => {
  try {
    const { amount } = req.body; // amount in paise (₹1 = 100 paise)
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
