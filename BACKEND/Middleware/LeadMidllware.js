const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Authentication token required" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authentication token required" });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

const CheckRolle = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ msg: "Not authenticated" });
    }

    const userRole = req.user.role.toLowerCase();
    const allowed = roles.map((r) => r.toLowerCase());

    // SuperAdmin and Admin have elevated access
    if (userRole === "superadmin" || allowed.includes(userRole)) {
      return next();
    }

    return res.status(403).json({ msg: "Access denied: insufficient permissions" });
  };
};

module.exports = { Auth, CheckRolle };
