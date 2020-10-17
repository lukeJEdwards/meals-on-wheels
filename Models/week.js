const mongoose = require("mongoose");

const weekSchema = mongoose.Schema(
  {
    hash: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    data: { type: Array, required: false },
    delivers: { type: Array, required: true },
  },
  { collection: "Weeks" }
);

module.exports = mongoose.model("week", weekSchema);
