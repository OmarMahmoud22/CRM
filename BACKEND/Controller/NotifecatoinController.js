const Notifecation = require("../Models/Notifecation")

const GetNotifecation = async(req,res)=>{
    try {
        const noti = Notifecation.find()
        if(!noti) return res.status(201).json({msg:"no notifecation"})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}

module.exports = {GetNotifecation}