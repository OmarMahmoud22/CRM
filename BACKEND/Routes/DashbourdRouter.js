const express = require("express");
const router = express.Router();

const { InformationLead } = require("../Dashbord/DashbourdController");
const {AllLead , AllUsers , InfoUser} = require("../Dashbord/DashbourdControllerAdmin")
const { Auth, CheckRolle } = require("../Middleware/LeadMidllware");



router.get("/dashbourd_admin/allusers" , Auth , CheckRolle("admin"),AllUsers)
router.get("/dashbourd_admin/allLead" , Auth , CheckRolle("admin" , "TeamLeader" , "agent") , AllLead)
router.get("/dashboard", Auth, CheckRolle("agent"), InformationLead);
router.get("/infouser/:id" , Auth , CheckRolle("admin") , InfoUser)


module.exports = router;