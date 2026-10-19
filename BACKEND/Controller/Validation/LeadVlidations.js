const joi = require("joi");

const LeadSchema = joi.object({
  name: joi.string().required().trim(),
  phone: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  status: joi
    .string()
    .valid(
      "New",
      "Contacted",
      "Inteersted",
      "Interested",
      "Follow_Up",
      "Follow-Up",
      "Won",
      "Lost",
    )
    .trim()
    .default("New"),
  source: joi
    .string()
    .valid("FaceBook", "Inestagram", "Tweeter", "from_your_frind")
    .default("FaceBook")
    .trim(),
});

module.exports = { LeadSchema };