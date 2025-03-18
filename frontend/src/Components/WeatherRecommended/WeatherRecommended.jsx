import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToursContext } from '../../Context/ToursContext';
import './WeatherRecommended.css';

const WeatherRecommended = () => {
  const navigate = useNavigate();
  const { tours, loading, error } = useContext(ToursContext);

  const handleExplore = (packageId) => {
    navigate(`/package/${packageId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading recommended tours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>Error loading recommended tours. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="popular-tours">
      <div className="popular-tours-header">
        <h2>Perfect Tours for current weather</h2>
      </div>
      <div className="tour-scroll-container">
        <div className="tour-row">
          {tours.map(tour => (
            <div key={tour._id} className="tour-card">
              <div className="tour-image">
                <img
                  src={`http://localhost:4000/${tour.images[0]}`}
                  alt={tour.name}
                  onError={(e) => {
                    e.target.src = 'https://picsum.photos/300/200';
                  }}
                />
                <div className="weather-badge">
                  <i className="fas fa-cloud-sun"></i> {tour.weather || 'Varied'}
                </div>
              </div>
              <div className="tour-info">
                <h3>{tour.name || 'Untitled Tour'}</h3>
                <div className="tour-details">
                  <span>
                    From <strong>${tour.price || 'N/A'}</strong>
                  </span>
                  <span>
                    <i className="fas fa-map-marker-alt"></i>
                    {tour.location || 'Unknown Location'}
                  </span>
                </div>
                <div className="tour-actions">
                  <button 
                    className="view-details-btn" 
                    onClick={() => handleExplore(tour._id)}
                  >
                    Explore Now <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherRecommended;