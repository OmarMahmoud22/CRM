const Notifecation = require("../Models/Notifecation");

const GetNotifecation = async (req, res) => {
  try {
    // const {userId} = req.params
    const noti = await Notifecation.find({
      userId: req.user.id,
    });
    if (!noti) return res.status(404).json({ msg: "no notifecation" });
    res.status(200).json({ msg: "done", noti });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};
const UpdateNotificatoin = async (req, res) => {
  try {
    const noti = await Notifecation.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true, runValidators: true },
    );
    if (!noti) return res.status(404).json({ msg: "not found" });
    res.status(200).json({ msg: "done", noti });
  } catch (error) {
    res.status(500).json({ msg: "server error", error: error.message });
  }
};

module.exports = { GetNotifecation, UpdateNotificatoin };
