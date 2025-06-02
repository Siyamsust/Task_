const express = require('express');
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Add Booking (after payment confirmation)
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { tourId, email } = req.body;

    if (!email || !tourId) {
      return res.status(400).json({ success: false, message: 'Email and tour ID are required' });
    }

    const existing = await Booking.findOne({ email, tourId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Tour already booked' });
    }

    const booking = new Booking({ email, tourId });
    await booking.save();

    res.status(201).json({ success: true, message: 'Tour booked successfully' });
  } catch (error) {
    console.error("Error adding booking:", error);
    res.status(500).json({ success: false, message: 'Failed to book tour' });
  }
});

// Get Bookings (divided into upcoming and completed)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const bookings = await Booking.find({ email }).populate('tourId');
    const today = new Date();

    const upcoming = [];
    const completed = [];

    bookings.forEach(({ tourId }) => {
      if (!tourId || !tourId.startDate) return;

      const startDate = new Date(tourId.startDate);
      if (startDate >= today) {
        upcoming.push(tourId);
      } else {
        completed.push(tourId);
      }
    });

    res.json({ success: true, upcoming, completed });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});

module.exports = router;
