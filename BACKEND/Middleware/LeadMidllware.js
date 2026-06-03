const { ModifiedPathsSnapshot } = require("mongoose");
const Lead = require("../Models/Lead");
const jwt = require("jsonwebtoken");
const LeadMiddleware = async (req, res, next) => {
  try {
    const AuthHeader = req.headers.authorization;
    if (!AuthHeader) return res.status(401).json({ msg: "not authorized" });
    const token = AuthHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    if (decoded.role !== "Dataentry")
      return res.status(401).json({ msg: "not authorized" });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const SuberUpdate = async (req, res, next) => {
  try {
    const AuthHeader = req.headers.authorization;
    if (!AuthHeader) return res.status(400).json({ msg: "not authorized" });
    const token = AuthHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRETKEY);
    if (payload.role !== "SuperViser")
      return res.status(401).json({ msg: "not authorized" });
    req.user = payload;
    next();
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

const AgentStatus = async (req, res, next) => {
  try {
    const AuthHeader = req.headers.authorization;
    if (!AuthHeader) return res.status(400).json({ msg: "not authorized" });
    const token = AuthHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRETKEY);
    if (payload.role !== "agent")
      return res.status(401).json({ msg: "not authorized" });
    req.user = payload;
    next();
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

module.exports = { LeadMiddleware, SuberUpdate, AgentStatus };
