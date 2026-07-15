const Notifecatoin  = require("../Models/Notifecation")
const { getIO } = require("../socket")
const createNotifecation  = async({
    userId,
    type,
    title,
    body,
    data={}
})=>{
    
    const notifecation = await Notifecatoin.create({
        userId,
        type,
        title,
        body,
        data
    })
    
    const io = getIO()
    io.to(userId.toString()).emit("newNotifecation" , notifecation)
return notifecation

}
module.exports = {
    createNotifecation
}