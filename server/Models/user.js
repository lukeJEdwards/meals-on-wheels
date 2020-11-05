const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    admin: { type: Boolean, required: true },
  },
  { collection: "User" }
);

module.exports = mongoose.model("user", userSchema);
