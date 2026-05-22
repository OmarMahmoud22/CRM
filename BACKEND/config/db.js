require('dotenv').config()
const mongoose = require('mongoose')

async function main() {
    try {
        const data = await mongoose.connect(process.env.MONGO_URI)
        console.log("connected in db");
        
    } catch (error) {
        console.log(error , "not connected");
        
    }
    
}

module.exports = main;