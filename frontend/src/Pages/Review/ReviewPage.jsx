import { useState, useEffect, useRef } from 'react';
import { Star, X, Upload, Check, AlertCircle } from 'lucide-react';
import './ReviewPage.css';
// Sample data for past tours and existing reviews
const pastTours = [
  { id: 1, name: 'Scenic Alps Adventure', date: '2025-04-15', company: 'Alpine Explorers' },
  { id: 2, name: 'Tropical Island Getaway', date: '2025-03-22', company: 'Island Ventures' },
  { id: 3, name: 'Historic City Tour - Rome', date: '2025-02-10', company: 'Cultural Journeys' },
];

const existingReviews = [
  { 
    id: 101, 
    tourId: 1, 
    userName: 'Emily Johnson', 
    rating: 5, 
    comment: 'Absolutely breathtaking views! Our guide was very knowledgeable and made sure everyone was comfortable with the hiking pace. Would highly recommend this tour to anyone visiting the region.', 
    date: '2025-04-18',
    photos: ['/api/placeholder/800/600', '/api/placeholder/800/600']
  },
  { 
    id: 102, 
    tourId: 2, 
    userName: 'Michael Rodriguez', 
    rating: 4, 
    comment: 'Beautiful beaches and great snorkeling spots! The accommodations were comfortable, though a bit basic. The tour guides were friendly and very helpful.', 
    date: '2025-03-25',
    photos: ['/api/placeholder/800/600']
  },
  { 
    id: 103, 
    tourId: 3, 
    userName: 'Sarah Williams', 
    rating: 5, 
    comment: 'This tour exceeded all my expectations! Our guide had incredible knowledge of Romes history and took us to some hidden gems I would have never found on my own.', 
    date: '2025-02-15',
    photos: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600']
  }
];

const ReviewPage = () => {
  const [selectedTour, setSelectedTour] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [reviews, setReviews] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Filter reviews based on selected tour
    if (selectedTour) {
      const filteredReviews = existingReviews.filter(
        review => review.tourId === parseInt(selectedTour)
      );
      setReviews(filteredReviews);
    } else {
      setReviews(existingReviews);
    }
  }, [selectedTour]);

  const handleRatingClick = (value) => {
    setRating(value);
    if (errors.rating) {
      setErrors({ ...errors, rating: null });
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newErrors = { ...errors };
    
    // Validate file types and sizes
    const validFiles = selectedFiles.filter(file => {
      const isValidType = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        newErrors.photos = 'Only JPG, JPEG, and PNG formats are allowed.';
        return false;
      }
      
      if (!isValidSize) {
        newErrors.photos = 'Files must be smaller than 5MB.';
        return false;
      }
      
      return true;
    });
    
    // Check if adding these files would exceed the 5 image limit
    if (photos.length + validFiles.length > 5) {
      newErrors.photos = 'You can upload a maximum of 5 images.';
      setErrors(newErrors);
      return;
    }
    
    if (validFiles.length > 0) {
      const newPhotos = validFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name
      }));
      
      setPhotos([...photos, ...newPhotos]);
      newErrors.photos = null;
    }
    
    setErrors(newErrors);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePhoto = (index) => {
    const newPhotos = [...photos];
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(newPhotos[index].preview);
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
    
    if (errors.photos && newPhotos.length < 5) {
      setErrors({ ...errors, photos: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedTour) {
      newErrors.tour = 'Please select a tour';
    }
    
    if (!rating || rating === 0) {
      newErrors.rating = 'Please provide a rating';
    }
    
    if (reviewText.length > 1000) {
      newErrors.reviewText = 'Review text cannot exceed 1000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Get selected tour data
    const tourData = pastTours.find(tour => tour.id === parseInt(selectedTour));
    
    // Create new review object
    const newReview = {
      id: Date.now(),
      tourId: parseInt(selectedTour),
      userName: 'You', // In a real app, this would come from user profile
      rating: rating,
      comment: reviewText,
      date: new Date().toISOString().split('T')[0],
      photos: photos.map(p => p.preview)
    };
    
    // Add to reviews (in a real app, this would be sent to an API)
    setReviews([newReview, ...reviews]);
    
    // Reset form
    setSelectedTour('');
    setRating(0);
    setReviewText('');
    setPhotos([]);
    
    // Show success message
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const characterCount = reviewText.length;
  const characterLimit = 1000;
  const isApproachingLimit = characterCount > characterLimit * 0.8;
  const isOverLimit = characterCount > characterLimit;

  return (
    <div className="review-page">
      <h1>Share Your Tour Experience</h1>
      
      {success && (
        <div className="success-message">
          <Check size={20} />
          <span>Thank you for your review! Your feedback helps other travelers.</span>
        </div>
      )}
      
      <div className="review-container">
        <div className="review-form-section">
          <h2>Write a Review</h2>
          <div className="review-form">
            <div className="form-group">
              <label htmlFor="tour-select">Select Tour:</label>
              <select
                id="tour-select"
                value={selectedTour}
                onChange={(e) => setSelectedTour(e.target.value)}
                className={errors.tour ? 'error' : ''}
              >
                <option value="">-- Select a tour --</option>
                {pastTours.map(tour => (
                  <option key={tour.id} value={tour.id}>
                    {tour.name} ({tour.date}) - {tour.company}
                  </option>
                ))}
              </select>
              {errors.tour && <div className="error-message">{errors.tour}</div>}
            </div>
            
            <div className="form-group">
              <label>Your Rating:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={28}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    fill={(hoverRating || rating) >= star ? '#FFD700' : 'none'}
                    stroke={(hoverRating || rating) >= star ? '#FFD700' : '#666'}
                    className="star-icon"
                  />
                ))}
              </div>
              {errors.rating && <div className="error-message">{errors.rating}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="review-text">Your Review: (Optional)</label>
              <textarea
                id="review-text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience, tips for other travelers, and highlights from the tour..."
                rows={5}
                className={isOverLimit ? 'error' : ''}
              ></textarea>
              <div className={`character-count ${isApproachingLimit ? 'approaching-limit' : ''} ${isOverLimit ? 'over-limit' : ''}`}>
                {characterCount}/{characterLimit} characters
              </div>
              {errors.reviewText && <div className="error-message">{errors.reviewText}</div>}
            </div>
            
            <div className="form-group photo-upload-section">
              <label>Share Your Photos: (Optional)</label>
              <div className="upload-container">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  multiple
                  className="file-input"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="upload-button">
                  <Upload size={20} />
                  <span>Upload Photos</span>
                </label>
                <div className="upload-help">
                  Up to 5 images (.jpg, .jpeg, .png, max 5MB each)
                </div>
              </div>
              {errors.photos && <div className="error-message">{errors.photos}</div>}
              
              {photos.length > 0 && (
                <div className="photo-previews">
                  {photos.map((photo, index) => (
                    <div key={index} className="photo-preview">
                      <img src={photo.preview} alt="Preview" />
                      <button
                        type="button"
                        className="remove-photo"
                        onClick={() => removePhoto(index)}
                      >
                        <X size={16} />
                      </button>
                      <div className="photo-name">{photo.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              type="button" 
              className="submit-button"
              onClick={handleSubmit}
            >
              Submit Review
            </button>
          </div>
        </div>
        
        <div className="reviews-section">
          <h2>
            {selectedTour 
              ? `Reviews for ${pastTours.find(t => t.id === parseInt(selectedTour))?.name || 'Selected Tour'}`
              : 'Recent Reviews'}
          </h2>
          
          <div className="reviews-list">
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-name">{review.userName}</div>
                      <div className="review-date">{review.date}</div>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < review.rating ? '#FFD700' : 'none'}
                          stroke={i < review.rating ? '#FFD700' : '#666'}
                        />
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <div className="review-comment">{review.comment}</div>
                  )}
                  {review.photos && review.photos.length > 0 && (
                    <div className="review-photos">
                      {review.photos.map((photo, index) => (
                        <img key={index} src={photo} alt="Review" />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-reviews">
                <AlertCircle size={20} />
                <span>No reviews available for this tour yet. Be the first to share your experience!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;