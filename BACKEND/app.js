require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const mongoose = require("mongoose");

const main = require("./config/db");
const { initSocket } = require("./socket");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;

// 1. CORS Middleware (Express 5 compatible)
const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    // Allow localhost & local IPs
    if (
      /^http:\/\/localhost(:\d+)?$/.test(origin) ||
      /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }

    // Allow any Vercel domain (*.vercel.app) including production and preview URLs
    try {
      const url = new URL(origin);
      if (url.hostname.endsWith(".vercel.app")) {
        return callback(null, true);
      }
    } catch {
      // Fall through if URL parsing fails
    }

    // Allow custom FRONTEND_URL if set
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }

    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Explicit preflight handler for OPTIONS requests - Express 5 compatible (no '*' path)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// 2. Body Parser
app.use(express.json());

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// Socket.io
try {
  initSocket(server);
} catch (e) {
  console.error("Socket init error:", e);
}

// 3. Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    name: "SalesCore CRM API",
    status: "ok",
    healthCheck: "/api/health",
  });
});

app.get("/api/health", async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  res.status(200).json({
    status: "ok",
    server: "online",
    database: dbStates[dbState] || "unknown",
    databaseConnected: dbState === 1,
    environment: process.env.NODE_ENV || "production",
    timestamp: new Date().toISOString(),
  });
});

// 4. Routes
const NotiRouter = require("./Routes/NotifecationRoutes");
app.use("/api", NotiRouter);

const Auth_Router = require("./Routes/AuthRouter");
app.use("/api", Auth_Router);

const Lead_Router = require("./Routes/LeadRouter");
app.use("/api", Lead_Router);

const Dashbourd_Router = require("./Routes/DashbourdRouter");
app.use("/api", Dashbourd_Router);

// Global 404 handler
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

module.exports = app;
module.exports.default = app;
module.exports.app = app;
module.exports.server = server;