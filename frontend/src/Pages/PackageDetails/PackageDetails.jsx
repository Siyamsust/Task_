import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ToursContext } from '../../Context/ToursContext';
import PackageGallery from '../../Components/PackageDetails/PackageGallery';
import PackageInfo from '../../Components/PackageDetails/PackageInfo';
import BookingCard from '../../Components/PackageDetails/BookingCard';
import './PackageDetails.css';
import axios from 'axios';

const PackageDetails = () => {
  const { id } = useParams();
  
  const { tours, loading, error, fetchTourById } = useContext(ToursContext);
  const [tour, setTour] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [errorReviews, setErrorReviews] = useState(null);

  const fetchReviews = async (tourId) => {
    try {
      setLoadingReviews(true);
      const response = await axios.get(`http://localhost:4000/reviews/tour/${tourId}`);
      setReviews(response.data);
      setErrorReviews(null);
    } catch (error) {
      setErrorReviews('Failed to load reviews.');
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

  // Move isTourCompleted function before useEffect
  const isTourCompleted = (startDate) => {
    if (!startDate) return false;
    const now = new Date();
    const tourStartDate = new Date(startDate);
    return tourStartDate < now;
  };

  useEffect(() => {
    const getTour = async () => {
      try {
        setLocalLoading(true);
        const data = await fetchTourById(id);
        setTour(data);
        setLocalError(null);
        setActiveImage(0);
        
        // Fetch reviews if tour is completed
        if (isTourCompleted(data.startDate)) {
          await fetchReviews(data._id);
        }
      } catch (err) {
        setLocalError('Failed to load tour details.');
      } finally {
        setLocalLoading(false);
      }
    };

    if (id) {
      getTour();
    }
  }, [id]);

  if (localLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tour details...</p>
      </div>
    );
  }

  if (localError || !tour) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>{localError || 'Error loading tour details. Please try again later.'}</p>
      </div>
    );
  }

  const handleImageChange = (index) => {
    setActiveImage(index);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  const ReviewsSection = () => (
    <div className="reviews-section">
      <h3>Customer Reviews</h3>
      {loadingReviews ? (
        <div className="loading-reviews">
          <div className="loading-spinner"></div>
          <p>Loading reviews...</p>
        </div>
      ) : errorReviews ? (
        <div className="error-reviews">
          <i className="fas fa-exclamation-circle"></i>
          <p>{errorReviews}</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="no-reviews">
          <i className="fas fa-comment-slash"></i>
          <p>No reviews available for this tour yet.</p>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <div key={review._id || index} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.userName ? review.userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="reviewer-details">
                    <h4>{review.userName || 'Anonymous User'}</h4>
                    <div className="review-rating">
                      {renderStars(review.rating || 0)}
                      <span className="rating-number">({review.rating || 0}/5)</span>
                    </div>
                  </div>
                </div>
                <div className="review-date">
                  {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Date not available'}
                </div>
              </div>
              {review.comment && (
                <div className="review-comment">
                  <p>{review.comment}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  return (
    <div className="package-details-container">
      {/* Gallery Section */}
      <div className="gallery-section">
        <PackageGallery
          images={tour.images}
          activeImage={activeImage}
          setActiveImage={handleImageChange}
        />
      </div>

      {/* Main Content Section */}
      <div className="main-content-section">
        <PackageInfo tour={tour} companyId={1} />
      </div>

      {/* Conditional Rendering: Booking Card or Reviews */}
      {isTourCompleted(tour.startDate) ? (
        <div className="reviews-container">
          <ReviewsSection />
        </div>
      ) : (
        <div className="booking-section">
          <BookingCard
            price={tour.price}
            availableSeats={tour.availableSeats}
            startDate={tour.startDate}
            endDate={tour.endDate}
            tourId={tour._id}
          />
        </div>
      )}
    </div>
  );
};

export default PackageDetails;