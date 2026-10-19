const Notifecation = require("../Models/Notifecation");

const GetNotifecation = async (req, res) => {
  try {
    const noti = await Notifecation.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ msg: "done", noti });
  } catch (error) {
    console.error("GetNotifecation error:", error);
    res.status(500).json({ msg: "server error" });
  }
};

const UpdateNotificatoin = async (req, res) => {
  try {
    const noti = await Notifecation.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isRead: true, readAt: new Date() },
      { new: true, runValidators: true },
    );

    if (!noti) return res.status(404).json({ msg: "Notification not found" });
    res.status(200).json({ msg: "done", noti });
  } catch (error) {
    console.error("UpdateNotificatoin error:", error);
    res.status(500).json({ msg: "server error", error: error.message });
  }
};

module.exports = { GetNotifecation, UpdateNotificatoin };
