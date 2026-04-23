// server.js
// This is the heart of our backend — it starts the entire server

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create the Express app
const app = express();

// ─── MIDDLEWARE ────────────────────────────────────────────────
// Middleware = code that runs between every request and response

// Allow React frontend (on different port) to make API calls
app.use(cors());

// Allow the server to understand JSON data sent in requests
app.use(express.json());

// ─── ROUTES ────────────────────────────────────────────────────
// Import all route files
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Tell Express to use these routes with a base path
app.use("/api/auth", authRoutes); // e.g., POST /api/auth/register
app.use("/api/products", productRoutes); // e.g., GET /api/products
app.use("/api/cart", cartRoutes); // e.g., POST /api/cart/add
app.use("/api/orders", orderRoutes); // e.g., POST /api/orders/place
app.use("/api/payment", paymentRoutes); // e.g., POST /api/payment/create-order

// ─── DEFAULT ROUTE ─────────────────────────────────────────────
// Test route — open browser and go to http://localhost:5000
app.get("/", (req, res) => {
  res.send("🛒 E-Commerce API is running!");
});

// ─── START SERVER ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
