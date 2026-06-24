const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    role: {
      type: String,
      enum: ["admin", "agent" , "Dataentry"  , "TeamLeader" , "SuperAdmin"],
      default: "agent",
    },
  },
 { timestamps: true }
);

// pre save hook
// بيتنفذ قبل ما document يتخزن في database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});


// instance method
// بنضيف method على كل admin document عشان نقارن password وقت login
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model("User", UserSchema);

module.exports = User;



