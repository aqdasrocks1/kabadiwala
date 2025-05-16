const express = require("express");
const router = express.Router();
const { requestPickup } = require("../controllers/pickupController");

router.post("/", requestPickup);
module.exports = router;
