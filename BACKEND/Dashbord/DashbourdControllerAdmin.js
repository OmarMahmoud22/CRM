const Lead = require("../Models/Lead");
const User = require("../Models/User");

const AllUsers = async (req, res) => {
  try {
    const user = await User.find()
      .select("full_name email createdAt")
      .select("-password")
      .sort({ createdAt: -1 });
    if (user.length === 0) return res.status(404).json({ msg: "Not Found" });
    res.status(201).json({ msg: "done", users: user, length: user.length });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

const AllLead = async (req, res) => {
  try {
    let leads;

    if (req.user.role === "agent") {
        const result = req.user.role
        console.log(result  );
        
      leads = await Lead.find({ Assignto: req.user.id })
        .populate("Assignto", "full_name email")
        .sort({ createdAt: -1 });
    } else {
      leads = await Lead.find()
        .populate("Assignto", "full_name email")
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      msg: "done",
      all_leads: leads,
      length: leads.length,
    });
  } catch (error) {
    res.status(500).json({
      msg: "server error",
      error: error.message,
    });
  }
};

const InfoUser = async(req,res)=>{
  try {
    const {id} = req.params
    const user = await User.findById(id).select("-password")
    if(!user) return res.status(404).json({msg:"Not Found"})
      res.status(200).json({msg:"done" , user})
  } catch (error) {
    res.status(500).json({msg:"server error"})
  }
}




module.exports = { AllUsers , AllLead , InfoUser};
