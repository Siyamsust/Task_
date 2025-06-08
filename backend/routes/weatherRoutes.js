const express = require('express');
const router = express.Router();
const {
  getWeatherAndTours,
  getSingleCityWeather
} = require('../controllers/weatherController');

//router.get('/weather/Dhaka', getWeatherAndTours); // Tour places
router.get('/weather/:city', getSingleCityWeather); // Any district

module.exports = router;
