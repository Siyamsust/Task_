const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  rating: Number,
  image: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
