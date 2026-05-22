const express = require("express");

const router = express.Router();

const { regester, login } = require("../Controller/AuthController");
const { RegesterMiddleWare } = require("../Middleware/AuthMeddleware");
router.post("/register", RegesterMiddleWare, regester);
router.post("/login", login);

module.exports = router;
