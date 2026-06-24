const User = require("../Models/User");

const Lead = require("../Models/Lead");
const { Assignto } = require("../Controller/LeadController");
const mongoose = require("mongoose");
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
        $facet: {
          StatusStats: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },
          ],
          SourceState: [
            {
              $group: {
                _id: "$source",
                count: { $sum: 1 },
                
              },
            },
          ],
        },
      },
    ]);

    const formatetedStause = {};
    const formatedSource = {};
    total[0].StatusStats.forEach((item) => {
      formatetedStause[item._id] = item.count;
    });
    total[0].SourceState.forEach((item) => {
      formatedSource[item._id] = item.count;
    });
    // console.log(SourceState);

    const totalLead = await Lead.countDocuments({
      Assignto: user_id,
    });

    res.json({
      msg: "done",
      totalLead,
      StatusStats: formatetedStause,
      SourceState: formatedSource,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error.message);
  }
};


module.exports = { InformationLead };
