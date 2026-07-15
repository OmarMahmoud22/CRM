const express = require("express");
const router = express.Router();

const {
  CreateLead,
  Assignto,
  StatusU,
  InfoLead,
  FilterByStatus,
  AllLead
} = require("../Controller/LeadController");

const { Auth, CheckRolle } = require("../Middleware/LeadMidllware");

const { TotalLead } = require("../Controller/LeadController");
const { checkPreferences } = require("joi");

router.post("/Lead", Auth, CheckRolle("Dataentry"), CreateLead);
router.patch("/Lead/:id", Auth, CheckRolle("TeamLeader"), Assignto);
router.patch("/LeadS/:id", Auth, CheckRolle("agent"), StatusU);
router.get("/AllLead", Auth, CheckRolle("agent"), TotalLead);
router.get("/lead/filter", Auth, CheckRolle("agent"), FilterByStatus);
router.get("/lead/:id", Auth, CheckRolle("agent"), InfoLead);
router.get("/all-lead" , Auth,CheckRolle("TeamLeader","admin"),AllLead)

module.exports = router;
