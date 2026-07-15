const mongoose = require("mongoose");
const Lead = require("../Models/Lead");
const { LeadSchema } = require("./Validation/LeadVlidations");
const {createNotifecation} = require("../service/NotifecationService")
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

    const { name, phone, email, source } = value;
    const data = await Lead.create({
      name,
      phone,
      email,
      source,
    });
    res.status(201).json({ msg: "Done To Created This Lead", data });
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
    
    await createNotifecation({
      userId:data.Assignto,
      type:"lead_assigned",
      title:"New Lead Assigned",
      body:`Lead ${data.name} has been assigned to you .`,
      data:{
        leadId:data._id 
      }


    })
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
      "Follow_Up",
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

const TotalLead = async (req, res) => {
  try {
    const user_id = req.user.id;
    console.log(user_id);

    const leads = await Lead.find({ Assignto: user_id });
    if (!leads) return res.status(400).json({ msg: "not found" });
    res.status(200).json({
      leads,
      totallead: leads.length,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const InfoLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findOne({
      _id: id,
      Assignto: req.user.id,
    });

    if (!lead)
      return res.status(404).json({
        msg: "Lead not found",
      });

    res.status(200).json({ lead });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const FilterByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    const data = await Lead.find({ status: status });
    // if (data == null) return res.status(404).json({ msg: "status not found" });
    res.status(200).json({ data, len: data.length });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

const AllLead = async (req, res) => {
  try {
    const data = await Lead.find().populate({
      path: "Assignto",
      select: "-_id full_name email",
    });
    if (!data) return res.status(200).json({ msg: "not found" });
    res.status(200).json({ msg: "done", data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  CreateLead,
  Assignto,
  StatusU,
  TotalLead,
  InfoLead,
  FilterByStatus,
  AllLead,
};
