const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    default: null,
  }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
