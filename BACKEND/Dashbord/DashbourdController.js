const User = require("../Models/User");

const Lead = require("../Models/Lead");
const { Assignto } = require("../Controller/LeadController");
const mongoose = require('mongoose')
const InformationLead = async (req, res) => {
  try {
    const user_id = new mongoose.Types.ObjectId(req.user.id);
    const total = await Lead.aggregate([
      {
        $match: {
          Assignto: user_id,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const formateted = {};
    total.forEach((item) => {
      formateted[item._id] = item.count;
    });
    const totalLead = await Lead.countDocuments({
      Assignto: user_id,
    });

    res.json({
      msg: "done",
      totalLead,
      ...formateted,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { InformationLead };
