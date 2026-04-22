// middleware/adminMiddleware.js
// Only allows admin users to proceed

const adminOnly = (req, res, next) => {
  // req.user is set by the protect middleware above
  if (req.user && req.user.role === "admin") {
    next(); // User is admin, let them through
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = { adminOnly };
