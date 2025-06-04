import React, { useState } from 'react';
import './WeatherSuggestion.css';

function WeatherSuggestion() {
const [city, setCity] = useState('');
const [weather, setWeather] = useState(null);
const [tours, setTours] = useState([]);

const fetchWeather = async () => {
try {
const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/weather/${city}`);
const data = await res.json();
setWeather({ temp: data.temp, condition: data.weather });
setTours(data.suggestions);
} catch (err) {
alert('Could not fetch weather.');
}
};

return (
<div className="weather-container">
<h2>🌤 Tour Suggestion by Weather</h2>
<input
type="text"
placeholder="Enter city name"
value={city}
onChange={(e) => setCity(e.target.value)}
/>
<button onClick={fetchWeather}>Get Suggestions</button>

php-template
Copy
Edit
  {weather && (
    <div className="weather-info">
      <p><strong>Weather:</strong> {weather.condition}</p>
      <p><strong>Temperature:</strong> {weather.temp}°C</p>
    </div>
  )}

  <div className="tour-cards">
    {tours.map((tour, index) => (
      <div key={index} className="tour-card">
        <img src={tour.image} alt={tour.name} />
        <p>{tour.name}</p>
      </div>
    ))}
  </div>
</div>
);
}

export default WeatherSuggestion;