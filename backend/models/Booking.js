const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
