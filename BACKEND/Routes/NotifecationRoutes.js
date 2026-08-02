const express = require("express");
const router = express.Router();

const {
  GetNotifecation,
  UpdateNotificatoin,
} = require("../Controller/NotifecatoinController");
const { Auth, CheckRolle } = require("../Middleware/LeadMidllware");

router.get("/noti", Auth, CheckRolle("agent"), GetNotifecation);
router.patch("/noti/:id", Auth, CheckRolle("agent"), UpdateNotificatoin);

module.exports = router;
