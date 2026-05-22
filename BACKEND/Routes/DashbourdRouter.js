const express = require('express')
const router = express.Router()

const {InformationLead} =require('../Dashbord/DashbourdController')
const {AgentStatus} = require('../Middleware/LeadMidllware')
router.get('/Dashbourd' ,AgentStatus,InformationLead )

module.exports = router