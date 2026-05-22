const mongoose = require("mongoose");
const Lead = require("../Models/Lead");
const { LeadSchema } = require("./Validation/LeadVlidations");
const CreateLead = async (req, res) => {
  try {
    const { error, value } = LeadSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error)
      return res
        .status(400)
        .json({ msg: error.details.map((err) => err.message) });

    const { name, phone, email, status, source } = value;
    const data = await Lead.create({
      name,
      phone,
      email,
      status,
      source,
    });
    res.status(201).json({ msg: "done", data });
  } catch (error) {
    res.status(500).json({
      msg: "server error",
    });
  }
};
const Assignto = async (req, res) => {
  try {
    const { Assignto } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ msg: "invalid id" });
    const data = await Lead.findOneAndUpdate(
      { _id: req.params.id },
      { Assignto },
      { new: true, runValidators: true },
    ).populate("Assignto", "full_name email");
    if (!data) return res.status(400).json({ msg: "no data" });
    res.status(201).json({ msg: "updataed", data });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

const StatusU = async (req, res) => {
  try {
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid lead id" });
    }
    const allowedStatus = [
      "New",
      "Contacted",
      "Inteersted",
      "Follow-Up",
      "Won",
      "Lost",
    ];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }
    const data = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );
    if (!data) {
      return res.status(404).json({ msg: "Lead not found" });
    }
    return res.status(200).json({
      msg: "Updated successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};


module.exports = { CreateLead, Assignto, StatusU };
