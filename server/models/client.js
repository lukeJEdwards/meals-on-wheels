const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    forename: { type: String, required: true },
    surname: { type: String, required: true },
    postcode: { type: String, required: true },
    address: { type: String, required: true },
    comments: Array,
    dietaryRequirements: Array,
    last_edited: String,
    currently_being_edited: Boolean
  },
  { collection: "Clients" }
);

module.exports = mongoose.model("client", clientSchema);
