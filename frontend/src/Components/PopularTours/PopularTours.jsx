import React, { useContext, useEffect, useState } from 'react'; 
import { ToursContext } from '../../Context/ToursContext';
import { Link, useNavigate } from 'react-router-dom';
import './PopularTours.css';

const PopularTours = () => {
  const { tours, loading, error } = useContext(ToursContext);
  const [averageRatings, setAverageRatings] = useState({});
  const navigate = useNavigate();
const [sortedTours, setSortedTours] = useState([]);

  useEffect(() => {
  const computePopularityAndSort = async () => {
    try {
      // Fetch reviews for rating fallback (optional)
      const res = await fetch('http://localhost:4000/reviews');
      const reviews = await res.json();

      const ratingMap = {};
      const countMap = {};

      reviews.forEach(review => {
        const tourId = review.tourId;
        if (!ratingMap[tourId]) {
          ratingMap[tourId] = 0;
          countMap[tourId] = 0;
        }
        ratingMap[tourId] += review.rating;
        countMap[tourId] += 1;
      });

      const averages = {};
      for (const id in ratingMap) {
        averages[id] = ratingMap[id] / countMap[id];
      }

      setAverageRatings(averages);

      // Compute popularity score
      const scored = [...tours].map(tour => {
        const {
          bookings = 0,
          views = 0,
          wishlistCount = 0,
          rating = {}
        } = tour.popularity || {};

        const averageRating = rating.average ?? averages[tour._id] ?? 0;
        const popularityScore = 
          (bookings * 0.5) +
          (averageRating * 10 * 0.2) +
          (views * 0.2) +
          (wishlistCount * 0.1);

        return { ...tour, popularityScore };
      });

      // Sort by popularityScore descending
      const sorted = scored.sort((a, b) => b.popularityScore - a.popularityScore);

      setSortedTours(sorted);
    } catch (err) {
      console.error("Error computing popularity scores:", err);
    }
  };

  if (tours.length > 0) {
    computePopularityAndSort();
  }
}, [tours]);


  const handleViewAll = () => {
    navigate('/populartours');
  };

  const handleExploreNow = async (tourId) => {
    try {
      await fetch(`http://localhost:4000/api/tours/${tourId}/increment-view`, {
        method: 'PATCH',
      });
      navigate(`/package/${tourId}`);
    } catch (error) {
      console.error('Failed to increment view count:', error);
      navigate(`/package/${tourId}`); // Navigate anyway
    }
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
          {sortedTours.map(tour => {
            const averageRating = averageRatings[tour._id];
            return (
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
                      Price: <strong>${tour.price || 'N/A'}</strong>
                    </span>
                    <span>
                      <i className="fas fa-tag"></i> {tour.packageCategories || 'General'}
                    </span>
                    <span>
                      <i className="fas fa-star"></i>{' '}
                      {averageRating ? `${averageRating} / 5` : 'No Rating'}
                    </span>
                  </div>
                  <div className="tour-actions">
                    <Link to="#" onClick={() => handleExploreNow(tour._id)} className="view-details-btn">
                      Explore Now <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularTours;
