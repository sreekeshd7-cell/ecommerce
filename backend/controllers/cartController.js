// controllers/cartController.js
// Cart is stored inside the User document

const User = require("../models/User");
const Product = require("../models/Product");

// GET /api/cart — Get user's cart
const getCart = async (req, res) => {
  try {
    // populate('cart.product') replaces product ID with actual product data
    const user = await User.findById(req.user._id).populate("cart.product");
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/cart/add — Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const addQuantity = quantity || 1;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.stock < addQuantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const user = await User.findById(req.user._id);

    // Check if this product is already in the cart
    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      // If already in cart, increase the quantity
      existingItem.quantity += addQuantity;
    } else {
      // Otherwise, add new item to cart
      user.cart.push({ product: productId, quantity: addQuantity });
    }

    // Deduct from stock
    product.stock -= addQuantity;
    await product.save();

    await user.save();

    // Return populated cart
    const updatedUser = await User.findById(req.user._id).populate(
      "cart.product",
    );
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/cart/:productId — Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Find the item to restore its stock
    const itemToRemove = user.cart.find(
      (item) => item.product.toString() === req.params.productId,
    );

    if (itemToRemove) {
      const product = await Product.findById(req.params.productId);
      if (product) {
        product.stock += itemToRemove.quantity;
        await product.save();
      }
    }

    // Filter out the product we want to remove
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== req.params.productId,
    );

    await user.save();

    const updatedUser = await User.findById(req.user._id).populate(
      "cart.product",
    );
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/cart/clear — Clear entire cart
const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Restore stock for all items
    for (const item of user.cart) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    user.cart = [];
    await user.save();
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
