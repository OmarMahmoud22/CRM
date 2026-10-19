const jwt = require("jsonwebtoken");

const RegesterMiddleWare = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Authorization token required" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRETKEY);

    const userRole = payload.role?.toString().toLowerCase();
    if (userRole !== "admin" && userRole !== "superadmin") {
      return res.status(403).json({ msg: "Admin privileges required" });
    }

    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = { RegesterMiddleWare };