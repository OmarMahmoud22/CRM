const Lead = require("../Models/Lead");
const User = require("../Models/User");

const AllUsers = async (req, res) => {
  try {
    const user = await User.find()
      .select("full_name email role createdAt")
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({ msg: "done", users: user, length: user.length });
  } catch (error) {
    console.error("AllUsers error:", error);
    res.status(500).json({ msg: "server error" });
  }
};

const AllLead = async (req, res) => {
  try {
    let leads;

    if (req.user.role === "agent") {
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
      lead: leads,
      length: leads.length,
      totallead: leads.length,
    });
  } catch (error) {
    console.error("AllLead error:", error);
    res.status(500).json({
      msg: "server error",
      error: error.message,
    });
  }
};

const InfoUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json({ msg: "done", user });
  } catch (error) {
    console.error("InfoUser error:", error);
    res.status(500).json({ msg: "server error" });
  }
};

const AdminDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalLeads, statusAgg, sourceAgg, recentLeads, usersByRole] =
      await Promise.all([
        User.countDocuments(),
        Lead.countDocuments(),
        Lead.aggregate([
          { $group: { _id: "$status", count: { $sum: 1 } } },
        ]),
        Lead.aggregate([
          { $group: { _id: "$source", count: { $sum: 1 } } },
        ]),
        Lead.find()
          .populate("Assignto", "full_name email")
          .sort({ createdAt: -1 })
          .limit(5),
        User.aggregate([
          { $group: { _id: "$role", count: { $sum: 1 } } },
        ]),
      ]);

    const statusStats = {};
    statusAgg.forEach((s) => {
      statusStats[s._id] = s.count;
    });

    const sourceStats = {};
    sourceAgg.forEach((s) => {
      sourceStats[s._id] = s.count;
    });

    const roleStats = {};
    usersByRole.forEach((r) => {
      roleStats[r._id] = r.count;
    });

    res.status(200).json({
      msg: "done",
      totalUsers,
      totalLeads,
      statusStats,
      sourceStats,
      roleStats,
      recentLeads,
    });
  } catch (error) {
    console.error("AdminDashboardStats error:", error);
    res.status(500).json({ msg: "server error", error: error.message });
  }
};

module.exports = { AllUsers, AllLead, InfoUser, AdminDashboardStats };
