const express = require("express");
const router = express.Router();

const { CreateLead  , Assignto ,StatusU ,GetLead} = require("../Controller/LeadController");
const {LeadMiddleware , SuberUpdate  , AgentStatus} =require("../Middleware/LeadMidllware")

router.post('/Lead' , LeadMiddleware , CreateLead)
router.patch('/Lead/:id' ,SuberUpdate, Assignto)
// router.get('/Lead/:id' ,  GetLead)
router.patch('/LeadS/:id' ,AgentStatus ,StatusU)

module.exports = router
