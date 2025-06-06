import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherSuggestion.css';
import fallbackImage from './pexels-pixabay-76969.jpg';

const WeatherSuggestion = () => {
  const [tourWeather, setTourWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tourSearch, setTourSearch] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/weather/Dhaka`);
      const suggestions = res.data.suggestions || [];
      setTourWeather(suggestions);
    } catch (err) {
      console.error("Error fetching tour weather:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const filteredTours = tourWeather.filter(t =>
    t.name?.toLowerCase().includes(tourSearch?.toLowerCase())
  );

  return (
    <div className="weather-container">
      <h2>🌄 Weather at Tour Places</h2>
      <input
        type="text"
        placeholder="🔍 Search tour place..."
        className="search-bar"
        value={tourSearch}
        onChange={(e) => setTourSearch(e.target.value)}
      />

      {loading ? (
        <p className="loading">Loading tour weather...</p>
      ) : (
        <div className="city-grid">
          {filteredTours.map((tour, index) => (
            <div key={index} className="city-card">
              <div className="image-container">
                <img
                  src={fallbackImage}
                  alt={tour.name}
                  className="tour-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
                <div className="overlay-text">
                  <h3>{tour.name}</h3>
                  <p><strong>Weather:</strong> {tour.weather ?? 'Unavailable'}</p>
                  <p><strong>Temperature:</strong> {tour.temp ?? 'N/A'}°C</p>
                  <p className="highlight">🌟 Tour Spot</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherSuggestion;
