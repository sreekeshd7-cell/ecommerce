// controllers/authController.js

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ─── Helper: Generate JWT Token ───────────────────────────────
const generateToken = (id) => {
  return jwt.sign(
    { id }, // Payload: what we store in the token
    process.env.JWT_SECRET, // Secret key to sign the token
    { expiresIn: "7d" }, // Token expires in 7 days
  );
};

// ─── REGISTER ─────────────────────────────────────────────────
// POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobileNumber, address } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (password will be hashed by model middleware)
    const user = await User.create({ name, email, password, mobileNumber, address });

    // Return user info + token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      mobileNumber: user.mobileNumber,
      address: user.address,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── LOGIN ────────────────────────────────────────────────────
// POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists AND password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobileNumber: user.mobileNumber,
        address: user.address,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET PROFILE ──────────────────────────────────────────────
// GET /api/auth/profile (protected)
const getProfile = async (req, res) => {
  // req.user is set by the protect middleware
  res.json(req.user);
};

module.exports = { registerUser, loginUser, getProfile };
