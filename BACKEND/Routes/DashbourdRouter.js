const express = require("express");
const router = express.Router();

const { InformationLead } = require("../Dashbord/DashbourdController");
const { Auth, CheckRolle } = require("../Middleware/LeadMidllware");
router.get("/dashboard", Auth, CheckRolle("agent"), InformationLead);

module.exports = router;
