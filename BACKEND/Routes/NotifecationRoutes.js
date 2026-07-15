const express = require("express")
const router = express.Router()

const {GetNotifecation} = require("../Controller/NotifecatoinController")
router.get("/noti" , GetNotifecation)

module.exports = router 