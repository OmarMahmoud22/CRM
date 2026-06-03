const express = require("express");
const router = express.Router();

const {
  InformationLead,
  TotalLead,
} = require("../Dashbord/DashbourdController");
const { AgentStatus } = require("../Middleware/LeadMidllware");
router.get("/dashboard", AgentStatus, InformationLead);
router.get("/AllLead", AgentStatus, TotalLead);

module.exports = router;
