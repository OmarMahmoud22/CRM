require("dotenv").config();
const mongoose = require("mongoose");

let isConnected = false;

async function main() {
  // If already connected, reuse connection (essential for serverless)
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn(
      "[MongoDB] Warning: MONGO_URI is not defined in environment variables. Database features will be unavailable.",
    );
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("connected in db");
    return conn;
  } catch (error) {
    isConnected = false;
    console.error("[MongoDB] Connection error:", error.message || error);
    return null;
  }
}

module.exports = main;