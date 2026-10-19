const mongoose = require("mongoose");
const Lead = require("../Models/Lead");
const { LeadSchema } = require("./Validation/LeadVlidations");
const { createNotifecation } = require("../service/NotifecationService");

const normalizeStatus = (status) => {
  if (status === "Interested") return "Inteersted";
  if (status === "Follow-Up") return "Follow_Up";
  return status;
};

const CreateLead = async (req, res) => {
  try {
    const { error, value } = LeadSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res
        .status(400)
        .json({ msg: error.details.map((err) => err.message) });
    }

    const { name, phone, email, source } = value;
    const status = normalizeStatus(value.status || "New");

    const data = await Lead.create({
      name,
      phone,
      email,
      source,
      status,
    });

    res.status(201).json({ msg: "Done To Created This Lead", data });
  } catch (error) {
    console.error("CreateLead error:", error);
    res.status(500).json({ msg: "server error" });
  }
};

const Assignto = async (req, res) => {
  try {
    const { Assignto: targetUser } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid lead id" });
    }

    if (targetUser && !mongoose.Types.ObjectId.isValid(targetUser)) {
      return res.status(400).json({ msg: "Invalid user id for assignment" });
    }

    const data = await Lead.findByIdAndUpdate(
      id,
      { Assignto: targetUser || null },
      { new: true, runValidators: true },
    ).populate("Assignto", "full_name email");

    if (!data) {
      return res.status(404).json({ msg: "Lead not found" });
    }

    if (targetUser && data.Assignto) {
      const assignedUserId = data.Assignto._id || data.Assignto;
      await createNotifecation({
        userId: assignedUserId,
        type: "lead_assigned",
        title: "New Lead Assigned",
        body: `Lead "${data.name}" has been assigned to you.`,
        data: { leadId: data._id },
      }).catch((err) =>
        console.warn("Notification dispatch warning:", err.message),
      );
    }

    res.status(200).json({ msg: "updated", data });
  } catch (error) {
    console.error("Assignto error:", error);
    res.status(500).json({ msg: "server error" });
  }
};

const StatusU = async (req, res) => {
  try {
    const { id } = req.params;
    let { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid lead id" });
    }

    status = normalizeStatus(status);

    const allowedStatus = [
      "New",
      "Contacted",
      "Inteersted",
      "Follow_Up",
      "Won",
      "Lost",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const query = { _id: id };
    if (req.user.role === "agent") {
      query.Assignto = req.user.id;
    }

    const data = await Lead.findOneAndUpdate(
      query,
      { status },
      { new: true, runValidators: true },
    ).populate("Assignto", "full_name email");

    if (!data) {
      return res
        .status(404)
        .json({ msg: "Lead not found or not assigned to you" });
    }

    return res.status(200).json({
      msg: "Updated successfully",
      data,
    });
  } catch (error) {
    console.error("StatusU error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const TotalLead = async (req, res) => {
  try {
    const query = req.user.role === "agent" ? { Assignto: req.user.id } : {};
    const lead = await Lead.find(query)
      .populate("Assignto", "full_name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      lead,
      leads: lead,
      totallead: lead.length,
      length: lead.length,
    });
  } catch (error) {
    console.error("TotalLead error:", error);
    return res.status(500).json({ msg: error.message });
  }
};

const InfoLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid lead id" });
    }

    let lead;
    if (req.user.role === "agent") {
      lead = await Lead.findOne({
        _id: id,
        Assignto: req.user.id,
      }).populate("Assignto", "full_name email");
    } else {
      lead = await Lead.findById(id).populate("Assignto", "full_name email");
    }

    if (!lead) {
      return res.status(404).json({ msg: "Lead not found" });
    }

    res.status(200).json({ lead });
  } catch (error) {
    console.error("InfoLead error:", error);
    res.status(500).json({ msg: error.message });
  }
};

const FilterByStatus = async (req, res) => {
  try {
    let { status } = req.query;
    status = normalizeStatus(status);

    const query = {};
    if (status && status !== "All") {
      query.status = status;
    }

    if (req.user.role === "agent") {
      query.Assignto = req.user.id;
    }

    const data = await Lead.find(query)
      .populate("Assignto", "full_name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ data, len: data.length });
  } catch (error) {
    console.error("FilterByStatus error:", error);
    res.status(500).json({ msg: "server error" });
  }
};

const DeleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid lead id" });
    }

    const deleted = await Lead.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ msg: "Lead not found" });
    }

    res.status(200).json({ msg: "Lead deleted successfully", id });
  } catch (error) {
    console.error("DeleteLead error:", error);
    res.status(500).json({ msg: "server error" });
  }
};

const UpdateLead = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid lead id" });
    }

    const { name, phone, email, source, status } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;
    if (source) updateData.source = source;
    if (status) updateData.status = normalizeStatus(status);

    const data = await Lead.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("Assignto", "full_name email");

    if (!data) {
      return res.status(404).json({ msg: "Lead not found" });
    }

    res.status(200).json({ msg: "Lead updated successfully", data });
  } catch (error) {
    console.error("UpdateLead error:", error);
    res.status(500).json({ msg: "server error" });
  }
};

module.exports = {
  CreateLead,
  Assignto,
  StatusU,
  TotalLead,
  InfoLead,
  FilterByStatus,
  DeleteLead,
  UpdateLead,
};
