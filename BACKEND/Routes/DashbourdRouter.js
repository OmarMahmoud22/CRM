const express = require("express");
const router = express.Router();

const { InformationLead } = require("../Dashbord/DashbourdController");
const {
  AllLead,
  AllUsers,
  InfoUser,
  AdminDashboardStats,
} = require("../Dashbord/DashbourdControllerAdmin");
const { Auth, CheckRolle } = require("../Middleware/LeadMidllware");

router.get("/dashbourd_admin/allusers", Auth, CheckRolle("admin", "TeamLeader"), AllUsers);
router.get("/dashbourd_admin/allLead", Auth, CheckRolle("admin", "TeamLeader", "agent"), AllLead);
router.get("/dashbourd_admin/stats", Auth, CheckRolle("admin"), AdminDashboardStats);
router.get("/dashboard", Auth, CheckRolle("agent", "admin"), InformationLead);
router.get("/infouser/:id", Auth, CheckRolle("admin"), InfoUser);

module.exports = router;