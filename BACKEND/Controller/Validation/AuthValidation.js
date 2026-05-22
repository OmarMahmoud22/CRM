const joi = require("joi");

const RegesterSchema = joi.object({
  full_name: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().min(8).trim(),
  confirm_password:joi.string().trim().valid(joi.ref("password")).required().messages({"any.only":"passwords do not match"}),
  role: joi.string().valid("admin", "agent" ,"Dataentry"  , "SuperViser"),
});
const LoginSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().min(8).trim(),
})

module.exports = {RegesterSchema , LoginSchema}