const express = require('express');
const router = express.Router();
const { getRestaurants } = require('../controllers/placeController');

router.get('/restaurants', getRestaurants); // ✅ This is your /api/restaurants

module.exports = router;
