const Lead = require('../Models/Lead')

const info = async(req,res)=>{
    try {
        const totla = await Lead.aggregate([
            {
                
            }
        ])
    } catch (error) {
        
    }
}