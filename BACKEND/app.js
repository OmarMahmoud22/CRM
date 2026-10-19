require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const http = require("http");

const main = require("./config/db");
const { initSocket } = require("./socket");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

initSocket(server);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
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

// Database connection
main();

if (require.main === module) {
  server.listen(port, () => {
    console.log(`SalesCore Backend listening on port ${port}`);
  });
}

module.exports = { app, server };
