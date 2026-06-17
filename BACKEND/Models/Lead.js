// const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const { Assignto } = require("../Controller/LeadController");

const LeadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Inteersted", "Follow_Up", "Won", "Lost"],
      default: "New",
    },

    Assignto: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    source: {
      type: String,
      enum: ["FaceBook", "Inestagram", "Tweeter", "from_your_frind"],
      default: "FaceBook",
    },
  },
  { timestamps: true },
);

const Lead = mongoose.model("Lead", LeadSchema);

module.exports = Lead;
