const Pickup = require("../models/Pickup");
const sendNotification = require("../utils/notification");

exports.requestPickup = async (req, res) => {
  try {
    const pickup = new Pickup(req.body);
    await pickup.save();
    await sendNotification(pickup);
    res.status(200).json({ message: "Pickup request submitted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};
