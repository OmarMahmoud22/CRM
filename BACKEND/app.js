require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const http = require("http");
const mongoose = require("mongoose");

const main = require("./config/db");
const { initSocket } = require("./socket");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// const cors = require("cors");

const corsOptions = {
  origin: [
    "https://crm-7jfo.vercel.app", // رابط الفرونت إند الحالي من الصورة
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200 // مهم جداً للمتصفحات القديمة وVercel
};

// تفعيل CORS على مستوى التطبيق بالكامل
app.use(cors(corsOptions));

// الرد المباشر على أي طلب Preflight OPTIONS بـ 200 لتفادي كود 500
app.options("*", cors(corsOptions));
// Explicit preflight handler for OPTIONS requests
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// Initialize Socket.io (non-blocking for serverless)
initSocket(server);

// Root route for quick verification
app.get("/", (req, res) => {
  res.status(200).json({
    name: "SalesCore CRM API",
    status: "ok",
    healthCheck: "/api/health",
  });
});

// Comprehensive Health check route
app.get("/api/health", async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  const dbStatus = dbStates[dbState] || "unknown";

  res.status(200).json({
    status: "ok",
    server: "online",
    database: dbStatus,
    databaseConnected: dbState === 1,
    environment: process.env.NODE_ENV || "production",
    timestamp: new Date().toISOString(),
  });
});

// Routes
const NotiRouter = require("./Routes/NotifecationRoutes");
app.use("/api", NotiRouter);

const Auth_Router = require("./Routes/AuthRouter");
app.use("/api", Auth_Router);

const Lead_Router = require("./Routes/LeadRouter");
app.use("/api", Lead_Router);

const Dashbourd_Router = require("./Routes/DashbourdRouter");
app.use("/api", Dashbourd_Router);

// Global 404 handler for unhandled routes
app.use((req, res) => {
  res.status(404).json({
    msg: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Database connection
main().catch((err) => {
  console.error("Database connection initialization failed:", err);
});

if (require.main === module) {
  server.listen(port, () => {
    console.log(`SalesCore Backend listening on port ${port}`);
  });
}

// Export app as default for Vercel serverless runtime, and attach app/server for backwards compatibility
module.exports = app;
module.exports.app = app;
module.exports.server = server;
