const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    hash: { type: String, required: true },
    forename: { type: String, required: true },
    surname: { type: String, required: true },
    postcode: { type: String, required: true },
    address: { type: String, required: true },
    comments: Array,
    dietaryRequirements: Array,
  },
  { collection: "Clients" }
);

module.exports = mongoose.model("client", clientSchema);
