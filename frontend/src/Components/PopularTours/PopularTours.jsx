import React, { useContext } from 'react';
import { ToursContext } from '../../Context/ToursContext';
import { Link } from 'react-router-dom';
import './PopularTours.css';

const PopularTours = () => {
  const { tours, loading, error } = useContext(ToursContext);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading popular tours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>Error loading popular tours. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="popular-tours">
  <div className="tour-grid">
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
        </div>
        <div className="tour-info">
          <h3>{tour.name || 'Untitled Tour'}</h3>
          <div className="tour-details">
            <span>
              <i className="fas fa-map-marker-alt"></i>
              {tour.location || 'N/A'}
            </span>
            <span>
              From <strong>${tour.price || 'N/A'}</strong><p></p>
            </span>
          </div>
          <Link to={`/package/${tour._id}`} className="view-details-btn">
            Explore Now <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default PopularTours;
