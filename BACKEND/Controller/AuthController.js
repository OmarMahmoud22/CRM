const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const {
  RegesterSchema,
  LoginSchema,
} = require("./Validation/AuthValidation");

const regester = async (req, res) => {
  try {
    const { error, value } = RegesterSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error)
      return res
        .status(400)
        .json({ msg: error.details.map((err) => err.message) });

    let { full_name, email, password, role } = value;
    if (role === "SuperViser") role = "TeamLeader";

    const email_exist = await User.findOne({ email });
    if (email_exist)
      return res.status(400).json({ msg: "this email is already exist" });

    const user = await User.create({ full_name, email, password, role });
    const token = jwt.sign(
      {
        role: user.role,
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },
      process.env.SECRETKEY,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      msg: "done",
      token,
      full_name: user.full_name,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ msg: "server error" });
  }
};

const login = async (req, res) => {
  try {
    const { error, value } = LoginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error)
      return res
        .status(400)
        .json({ msg: error.details.map((err) => err.message) });

    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "this email not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ msg: "wrong password" });

    const token = jwt.sign(
      {
        role: user.role,
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },
      process.env.SECRETKEY,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      msg: "done",
      token,
      full_name: user.full_name,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "server error", error: error.message });
  }
};

module.exports = { regester, login };
