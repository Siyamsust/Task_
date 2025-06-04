const express = require('express');
const router = express.Router();

// Sample weather route
router.get('/weather/:city', (req, res) => {
  const city = req.params.city;
  const data = {
    temp: 28,
    weather: 'clear',
    suggestions: [`Visit the botanical garden in ${city}`, `Explore old town ${city}`],
  };
  res.json(data);
});

module.exports = router;
