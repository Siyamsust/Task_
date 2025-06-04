import React, { useContext, useEffect, useState } from 'react';
import { ToursContext } from '../../Context/ToursContext';
import { Link, useNavigate } from 'react-router-dom';
import './PopularTours.css';

const PopularTours = () => {
  const { tours, loading, error } = useContext(ToursContext);
  const [averageRatings, setAverageRatings] = useState({});
  const [sortedTours, setSortedTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const computePopularityAndSort = async () => {
      try {
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

        const sorted = scored.sort((a, b) => b.popularityScore - a.popularityScore);
        setSortedTours(sorted);
      } catch (err) {
        console.error("Error computing popularity scores:", err);
        setSortedTours(tours);
      }
    };

    if (tours && tours.length > 0) {
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
      navigate(`/package/${tourId}`);
    }
  };

  const isTourCompleted = (startDate) => {
    if (!startDate) return false;
    const now = new Date();
    const tourStartDate = new Date(startDate);
    return tourStartDate < now;
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

  const toursToDisplay = sortedTours.length > 0 ? sortedTours : tours || [];

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
          {toursToDisplay.slice(0, 5).map(tour => {
            if (!tour || !tour._id) return null;

            const averageRating = averageRatings[tour._id];
            const tourName = tour.name || 'Untitled Tour';
            const tourPrice = tour.price || 'N/A';
            const tourCategory = tour.packageCategories?.join(', ') || 'General';
            const tourImage = tour.images && tour.images.length > 0
              ? `http://localhost:4000/${tour.images[0]}`
              : 'https://picsum.photos/300/200';
            const isCompleted = isTourCompleted(tour.startDate);

            return (
              <div key={tour._id} className="tour-card">
                <div className="tour-image">
                  <img
                    src={tourImage}
                    alt={tourName}
                    onError={(e) => {
                      e.target.src = 'https://picsum.photos/300/200';
                    }}
                  />
                  {isCompleted && <span className="completed-tag">Completed</span>}
                </div>
                <div className="tour-info">
                  <h3>{tourName}</h3>
                  <div className="tour-details">
                    <span>
                      Price: <strong>${tourPrice}</strong>
                    </span>
                    <span>
                      <i className="fas fa-tag"></i> {tourCategory}
                    </span>
                    <span>
                      <i className="fas fa-star"></i>{' '}
                      {averageRating ? `${averageRating.toFixed(1)} / 5` : 'No Rating'}
                    </span>
                  </div>
                  <div className="tour-actions">
                    <button
                      onClick={() => handleExploreNow(tour._id)}
                      className="view-details-btn"
                    >
                      Explore Now
                      {isTourCompleted(tour.startDate) && ' (Tour Ended)'}{' '}
                      {!isTourCompleted(tour.startDate) && <i className="fas fa-arrow-right"></i>}
                    </button>
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
