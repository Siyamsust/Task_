import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToursContext } from '../../Context/ToursContext';
import { useAuth } from '../../Context/AuthContext';
import './TourSuggestions.css';

const TourSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [averageRatings, setAverageRatings] = useState({});
  const { tours } = useContext(ToursContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Consistent user data access like in ProfileInfo
  const userData = user?.user || user;

  // Fetch average ratings
  useEffect(() => {
    const fetchRatings = async () => {
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
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchRatings();
  }, []);

  // Helper function to check if tour is upcoming (matches UpcomingTours logic)
  const isTourUpcoming = (startDate) => {
    if (!startDate) return false; // If no start date, don't consider it upcoming
    
    // Same logic as UpcomingTours component
    const oneDayFromNow = new Date();
    oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);
    oneDayFromNow.setHours(0, 0, 0, 0); // Start of day
    
    const tourStartDate = new Date(startDate);
    return tourStartDate >= oneDayFromNow;
  };

  // Filter tours to get only upcoming ones (same logic as UpcomingTours)
  const getUpcomingTours = (toursList) => {
    return toursList.filter(tour => 
      tour.status === 'approved' && isTourUpcoming(tour.startDate)
    );
  };

  // Fetch suggestions based on user's recent activity or popular tours
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!tours || tours.length === 0) return;

      setLoading(true);
      setError(null);

      try {
        // First filter to get only upcoming tours (same as UpcomingTours)
        const upcomingTours = getUpcomingTours(tours);
        
        if (upcomingTours.length === 0) {
          setSuggestions([]);
          setLoading(false);
          return;
        }

        // Get user's recent tour views from localStorage or use popular tours
        const recentViews = JSON.parse(localStorage.getItem('recentTourViews') || '[]');
        let suggestedTourNames = new Set();

        if (recentViews.length > 0) {
          // Get suggestions based on recent views
          for (const tourName of recentViews.slice(0, 3)) { // Use last 3 viewed tours
            try {
              const response = await fetch(`http://localhost:4000/api/suggestions/${encodeURIComponent(tourName)}`);
              if (response.ok) {
                const suggestions = await response.json();
                suggestions.forEach(name => suggestedTourNames.add(name));
              }
            } catch (err) {
              console.error(`Error fetching suggestions for ${tourName}:`, err);
            }
          }
        }

        // If no suggestions from recent views, get popular upcoming tours
        if (suggestedTourNames.size === 0) {
          const popularUpcomingTours = upcomingTours
            .filter(tour => tour.popularity && (tour.popularity.views > 5 || tour.popularity.bookings > 0))
            .sort((a, b) => {
              const scoreA = (a.popularity.bookings * 0.7) + (a.popularity.views * 0.3);
              const scoreB = (b.popularity.bookings * 0.7) + (b.popularity.views * 0.3);
              return scoreB - scoreA;
            })
            .slice(0, 6)
            .map(tour => tour.name);

          popularUpcomingTours.forEach(name => suggestedTourNames.add(name));
        }

        // Convert tour names to upcoming tour objects only
        const suggestedTours = Array.from(suggestedTourNames)
          .map(name => upcomingTours.find(tour => tour.name === name))
          .filter(tour => tour) // Remove any undefined tours
          .slice(0, 6); // Limit to 6 suggestions

        // If we don't have enough suggested tours, fill with random upcoming tours
        if (suggestedTours.length < 6) {
          const remainingSlots = 6 - suggestedTours.length;
          const existingTourIds = new Set(suggestedTours.map(tour => tour._id));
          
          const additionalTours = upcomingTours
            .filter(tour => !existingTourIds.has(tour._id))
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) // Sort by start date like UpcomingTours
            .slice(0, remainingSlots);
          
          suggestedTours.push(...additionalTours);
        }

        setSuggestions(suggestedTours);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setError('Failed to load suggestions');
        
        // Fallback to upcoming tours only
        const fallbackTours = getUpcomingTours(tours).slice(0, 6);
        setSuggestions(fallbackTours);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [tours]);

  const handleExploreNow = async (tourId, tourName) => {
    try {
      // Increment view count
      await fetch(`http://localhost:4000/api/tours/${tourId}/increment-view`, {
        method: 'PATCH',
      });

      // Save to recent views
      const recentViews = JSON.parse(localStorage.getItem('recentTourViews') || '[]');
      const updatedViews = [tourName, ...recentViews.filter(name => name !== tourName)].slice(0, 10);
      localStorage.setItem('recentTourViews', JSON.stringify(updatedViews));

      navigate(`/package/${tourId}`);
    } catch (error) {
      console.error('Failed to increment view count:', error);
      navigate(`/package/${tourId}`);
    }
  };

  // Helper function to calculate days until tour starts (same as UpcomingTours)
  const getDaysUntilStart = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const diffTime = start - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="tour-suggestions-section">
        <div className="tour-suggestions-header">
          <h2>Upcoming Tours for You</h2>
          <p>Discovering upcoming tours based on your interests...</p>
        </div>
        <div className="tour-suggestions-loading">
          <div className="loading-spinner"></div>
          <p>Loading suggestions...</p>
        </div>
      </div>
    );
  }

  if (error || suggestions.length === 0) {
    return null; // Don't show the section if there are no suggestions
  }

  return (
    <div className="tour-suggestions-section">
      <div className="tour-suggestions-header">
        <h2>
          {userData ? `Upcoming Tours for You, ${userData.name?.split(' ')[0] || 'Traveler'}` : 'Upcoming Tours'}
        </h2>
        <p>Discover upcoming tours tailored to your interests and preferences</p>
      </div>

      <div className="tour-suggestions-container">
        <div className="tour-suggestions-grid">
          {suggestions.map(tour => {
            if (!tour || !tour._id) return null;

            const averageRating = averageRatings[tour._id];
            const tourName = tour.name || 'Untitled Tour';
            const tourPrice = tour.price || 'N/A';
            const tourCategory = tour.packageCategories?.join(', ') || 'General';
            const tourImage = tour.images && tour.images.length > 0
              ? `http://localhost:4000/${tour.images[0]}`
              : 'https://picsum.photos/300/200';
            const duration = tour.duration ? `${tour.duration.days} days / ${tour.duration.nights} nights` : 'Duration not specified';
            const daysUntilStart = getDaysUntilStart(tour.startDate);

            return (
              <div key={tour._id} className="suggestion-card">
                <div className="suggestion-card-image">
                  <img
                    src={tourImage}
                    alt={tourName}
                    onError={(e) => {
                      e.target.src = 'https://picsum.photos/300/200';
                    }}
                  />
                  {/* Add days until start tag like UpcomingTours */}
                  <span className="suggestion-upcoming-tag">
                    {daysUntilStart} days left
                  </span>
                  <div className="suggestion-card-overlay">
                    
                  </div>
                </div>
                
                <div className="suggestion-card-content">
                  <div className="suggestion-card-header">
                    <h3>{tourName}</h3>
                    <div className="suggestion-rating">
                      <i className="fas fa-star"></i>
                      <span>
                        {averageRating ? `${averageRating.toFixed(1)}` : 'New'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="suggestion-card-details">
                    <div className="suggestion-detail-item">
                      <i className="fas fa-tag"></i>
                      <span>{tourCategory}</span>
                    </div>
                    <div className="suggestion-detail-item">
                      <i className="fas fa-clock"></i>
                      <span>{duration}</span>
                    </div>
                    <div className="suggestion-detail-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>
                        {tour.destinations?.length > 0 
                          ? `${tour.destinations[0].name}${tour.destinations.length > 1 ? ` +${tour.destinations.length - 1} more` : ''}`
                          : 'Multiple Destinations'
                        }
                      </span>
                    </div>
                  </div>
                  
                  <div className="suggestion-card-footer">
                    <div className="suggestion-price">
                      <span className="price-label">From</span>
                      <span className="price-value">${tourPrice}</span>
                    </div>
                    <button
                      onClick={() => handleExploreNow(tour._id, tour.name)}
                      className="suggestion-explore-btn"
                    >
                      Explore Now
                      <i className="fas fa-arrow-right"></i>
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

export default TourSuggestions;