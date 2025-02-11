import React , { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './WeatherRecommended.css';
const WeatherRecommended = () => {
  const navigate = useNavigate();
  const recommendations = [
    {
      id: 1,
      name: 'Sunny Beach Resort',
      location: 'Bali, Indonesia',
      weather: 'Sunny',
      temp: 28,
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62',
      price: 899
    },
    {
      id: 2,
      name: 'Mountain Retreat',
      location: 'Swiss Alps',
      weather: 'Snow',
      temp: -2,
      image: 'https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b',
      price: 1299
    }
  ];

  const handleExplore = (packageId) => {
    navigate(`/package/${packageId}`);
  };

  return (
    <section className="weather-recommended">
      <div className="section-header">
        <p>Perfect destinations for current weather conditions</p>
      </div>

      <div className="recommendations-grid">
        {recommendations.map(item => (
          <div key={item.id} className="recommendation-card">
            <div className="recommendation-image">
              <img src={item.image} alt={item.name} />
              <div className="weather-badge">
                <i className={`fas fa-${item.weather === 'Sunny' ? 'sun' : 'snowflake'}`}></i>
                {item.temp}°C
              </div>
            </div>
            <div className="recommendation-content">
              <h3>{item.name}</h3>
              <p><i className="fas fa-map-marker-alt"></i> {item.location}</p>
              <div className="recommendation-footer">
                <span className="price">From ${item.price}</span>
                <button 
                  className="explore-btn"
                  onClick={() => handleExplore(item.id)}
                >
                   Explore Now <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeatherRecommended; 