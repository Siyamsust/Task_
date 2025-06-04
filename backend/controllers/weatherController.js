const axios = require("axios");

const TOURS = [
{ name: "Cox’s Bazar", condition: "Clear", image: "https://i.imgur.com/Xv7N6G7.jpg" },
{ name: "Saint Martin", condition: "Clear", image: "https://i.imgur.com/3PkB1Nu.jpg" },
{ name: "Sylhet Tea Gardens", condition: "Rain", image: "https://i.imgur.com/WtWn4yb.jpg" },
{ name: "Ratargul Forest", condition: "Rain", image: "https://i.imgur.com/vh5ptTr.jpg" },
{ name: "Sajek Valley", condition: "Mist", image: "https://i.imgur.com/HReXksV.jpg" },
{ name: "Bandarban Hills", condition: "Mist", image: "https://i.imgur.com/Ef4OjR9.jpg" },
{ name: "Sundarbans", condition: "Clouds", image: "https://i.imgur.com/WDFtguE.jpg" },
{ name: "Rangamati", condition: "Clouds", image: "https://i.imgur.com/LCdnCmD.jpg" },
];

exports.getWeatherAndTours = async (req, res) => {
const city = req.params.city;
const apiKey = process.env.WEATHER_API_KEY;

try {
const response = await axios.get(
https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric
);
const weather = response.data.weather[0].main;
const temp = response.data.main.temp;

const suggestions = TOURS.filter((tour) => tour.condition === weather);
res.json({ weather, temp, suggestions });
} catch (error) {
res.status(500).json({ error: "Weather fetch failed" });
}
};