import React, { useContext } from 'react';
import { ToursContext } from '../../Context/ToursContext';
import { Link, useNavigate } from 'react-router-dom';
import './PopularTours.css';

const PopularTours = () => {
  const { tours, loading, error } = useContext(ToursContext);
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/populartours');
  };

  const handleAddToWishlist = (tourId) => {
    // Placeholder function for adding to wishlist
    console.log(`Added tour ${tourId} to wishlist`);
  };

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
      <div className="popular-tours-header">
        <h2>Popular Tour Packages</h2>
        <button onClick={handleViewAll} className="view-all-btn">
          View All <i className="fas fa-arrow-right"></i>
        </button>
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
              </div>
              <div className="tour-info">
                <h3>{tour.name || 'Untitled Tour'}</h3>
                <div className="tour-details">
                  <span>
                    From <strong>${tour.price || 'N/A'}</strong>
                  </span>
                  <span>
                    <i className="fas fa-tag"></i>
                    {tour.packageCategories || 'General'}
                  </span>
                  <span>
                    <i className="fas fa-star"></i>
                    {tour.ratings || 'No Rating'}
                  </span>
                </div>
                <div className="tour-actions">
                  <Link to={`/package/${tour._id}`} className="view-details-btn">
                    Explore Now <i className="fas fa-arrow-right"></i>
                  </Link>
                  {/* <button
                    className="add-wishlist-btn"
                    onClick={() => handleAddToWishlist(tour._id)}
                  >
                    <i className="far fa-heart"></i>
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularTours;