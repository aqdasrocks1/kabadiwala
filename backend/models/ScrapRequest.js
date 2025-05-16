const mongoose = require('mongoose');

const ScrapRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scrapType: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScrapRequest', ScrapRequestSchema);
