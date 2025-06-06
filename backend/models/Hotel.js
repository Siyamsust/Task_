const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String, // e.g., "Cox's Bazar"
  rating: Number,
  image: String
});

module.exports = mongoose.model('Hotel', hotelSchema);
