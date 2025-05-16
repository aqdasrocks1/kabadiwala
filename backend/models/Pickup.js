const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema({
  name: String,
  address: String,
  contact: String,
  scrapType: String,
  quantity: String,
  requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Pickup", pickupSchema);
