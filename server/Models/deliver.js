const mongoose = require("mongoose");

const deliverSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    paid: { type: Boolean, required: true },
  },
  { collection: "Delivers" }
);

module.exports = mongoose.model("deliver", deliverSchema);
