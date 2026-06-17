const express = require("express");
const router = express.Router();

const {
  CreateLead,
  Assignto,
  StatusU,
  InfoLead,
} = require("../Controller/LeadController");

const { Auth, CheckRolle } = require("../Middleware/LeadMidllware");

const { TotalLead } = require("../Controller/LeadController");

router.post("/Lead", Auth, CheckRolle("Dataentry"), CreateLead);

router.patch("/Lead/:id", Auth, CheckRolle("SuperViser"), Assignto);

router.patch("/LeadS/:id", Auth, CheckRolle("agent"), StatusU);

router.get("/AllLead", Auth, CheckRolle("agent"), TotalLead);

router.get("/lead/:id", Auth, CheckRolle("agent"), InfoLead);

module.exports = router;
