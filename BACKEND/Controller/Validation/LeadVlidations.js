const joi = require('joi')

const LeadSchema = joi.object({
    name:joi.string().required().trim(),
    phone:joi.string().required().trim(),
    email:joi.string().email().required().trim(),
    status:joi.string().valid("New" , "Contacted" , "Inteersted" , "Follow-Up" , "Won" , "Lost").trim(),
    // coustomer:joi.number().required().trim(),
    source:joi.string().valid("FaceBook" , "Inestagram" , "Tweeter" , "from_your_frind").required().trim()
})

module.exports = {LeadSchema}