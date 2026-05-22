const User = require(".././Models/User");
const jwt = require("jsonwebtoken");
const RegesterMiddleWare = async (req, res, next) => {
  try {
    const AuthHeader = req.headers.authorization;
    console.log(req.headers);
    if (!AuthHeader) return res.status(401).json({ msg: "not authorized" });
    const token = AuthHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRETKEY);
    if (payload.role != "admin")
      return res.status(401).json({ msg: "not authorized" });
    next();
  } catch (error) {
    res.status(400).json({ msg: "not authorized" });
  }
};
 module.exports = {RegesterMiddleWare}