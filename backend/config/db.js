// config/db.js
// This file handles the connection to MongoDB

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Try to connect using the URI from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, print the error and stop the program
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
