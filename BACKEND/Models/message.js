const { required } = require("joi")
const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
senderId:{
    type:String,
    required:true
},
reseverId:{
    type:String,
    required:true
},
message:{
    type:String,
    required:true
}
})

const Message = mongoose.model('Message' , MessageSchema)
module.exports = Message