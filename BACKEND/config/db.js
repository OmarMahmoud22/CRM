require("dotenv").config();
const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function main() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn(
      "[MongoDB] Warning: MONGO_URI is not defined in environment variables. Database features will be unavailable."
    );
    return null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // يمنع تعليق المونجوس للطلبات عند انقطاع الاتصال
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log("connected in db");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("[MongoDB] Connection error:", error.message || error);
    return null;
  }
}

module.exports = main;