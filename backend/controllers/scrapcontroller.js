const ScrapRequest = require('../models/ScrapRequest');
const User = require('../models/User');
const { sendSMS, sendEmail } = require('../utils/notification');

exports.createScrapRequest = async (req, res) => {
  try {
    const { scrapType, quantity, location } = req.body;
    const scrapRequest = new ScrapRequest({
      user: req.user.id,
      scrapType,
      quantity,
      location
    });
    await scrapRequest.save();

    // Notify admins or dealers via SMS/email
    const admins = await User.find({ role: 'admin' });
    for (const admin of admins) {
      const msg = `New scrap request from user ${req.user.id}: ${scrapType} - ${quantity} kg`;
      if (admin.phone) await sendSMS(admin.phone, msg);
      if (admin.email) await sendEmail(admin.email, 'New Scrap Request', msg);
    }

    res.status(201).json(scrapRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getScrapRequests = async (req, res) => {
  try {
    let scrapRequests;
    if (req.user.role === 'admin' || req.user.role === 'dealer') {
      scrapRequests = await ScrapRequest.find().populate('user', 'name email phone');
    } else {
      scrapRequests = await ScrapRequest.find({ user: req.user.id }).populate('user', 'name email phone');
    }
    res.json(scrapRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateScrapRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const scrapRequest = await ScrapRequest.findById(id).populate('user');

    if (!scrapRequest) return res.status(404).json({ message: 'Scrap request not found' });

    scrapRequest.status = status;
    await scrapRequest.save();

    // Notify user about status change
    const msg = `Your scrap request (${scrapRequest.scrapType}) status updated to: ${status}`;
    if (scrapRequest.user.phone) await sendSMS(scrapRequest.user.phone, msg);
    if (scrapRequest.user.email) await sendEmail(scrapRequest.user.email, 'Scrap Request Status Update', msg);

    res.json(scrapRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
