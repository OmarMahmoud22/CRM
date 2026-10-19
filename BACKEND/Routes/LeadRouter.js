const express = require("express");
const router = express.Router();

const {
  CreateLead,
  Assignto,
  StatusU,
  InfoLead,
  FilterByStatus,
  TotalLead,
  DeleteLead,
  UpdateLead,
} = require("../Controller/LeadController");

const { Auth, CheckRolle } = require("../Middleware/LeadMidllware");

// Create Lead (Dataentry, Admin, SuperAdmin)
router.post("/Lead", Auth, CheckRolle("Dataentry", "admin"), CreateLead);
router.post("/lead", Auth, CheckRolle("Dataentry", "admin"), CreateLead);

// Assign Lead (TeamLeader, Admin, SuperAdmin)
router.patch("/Lead/:id", Auth, CheckRolle("TeamLeader", "admin"), Assignto);
router.patch("/lead/:id", Auth, CheckRolle("TeamLeader", "admin"), Assignto);

// Update Status (Agent, TeamLeader, Admin, SuperAdmin)
router.patch("/LeadS/:id", Auth, CheckRolle("agent", "TeamLeader", "admin"), StatusU);
router.patch("/lead/status/:id", Auth, CheckRolle("agent", "TeamLeader", "admin"), StatusU);

// Lead Queries
router.get(
  "/AllLead",
  Auth,
  CheckRolle("agent", "TeamLeader", "admin"),
  TotalLead,
);
router.get(
  "/all-lead",
  Auth,
  CheckRolle("agent", "TeamLeader", "admin"),
  TotalLead,
);

router.get(
  "/lead/filter",
  Auth,
  CheckRolle("agent", "TeamLeader", "admin"),
  FilterByStatus,
);

router.get(
  "/lead/:id",
  Auth,
  CheckRolle("agent", "admin", "TeamLeader"),
  InfoLead,
);

// Update & Delete Lead Details
router.put("/lead/:id", Auth, CheckRolle("admin", "TeamLeader"), UpdateLead);
router.delete("/lead/:id", Auth, CheckRolle("admin"), DeleteLead);

module.exports = router;
