const { ModifiedPathsSnapshot } = require("mongoose");
const Lead = require("../Models/Lead");
const jwt = require("jsonwebtoken");
const Auth = async (req, res, next) => {
  try {
    const AuthHeader = req.headers.authorization;
    if (!AuthHeader) return res.status(401).json({ msg: "not authorized" });
    const token = AuthHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    // if (decoded.role !== "Dataentry")
    //   return res.status(401).json({ msg: "not authorized" });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const CheckRolle = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role))
      return res.status(401).json({ msg: "accssc denied" });
    next()
  };
};

module.exports = { Auth, CheckRolle };
