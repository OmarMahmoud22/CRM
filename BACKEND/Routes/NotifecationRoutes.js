const express = require("express");
const router = express.Router();

const {
  GetNotifecation,
  UpdateNotificatoin,
} = require("../Controller/NotifecatoinController");
const { Auth } = require("../Middleware/LeadMidllware");

router.get("/noti", Auth, GetNotifecation);
router.patch("/noti/:id", Auth, UpdateNotificatoin);

module.exports = router;
