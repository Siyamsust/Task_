// BookingCard.jsx
import React from 'react';
import './BookingCard.css';

const BookingCard = ({ price, availableSeats, startDate, endDate, onBook, onAddToWishlist }) => {
  return (
    <div className="booking-card">
      <div className="booking-header">
        <div className="price-section">
          <div className="price">
            <span className="from-text">From</span>
            <h2>${price}</h2>
            <span className="per-person">per person</span>
          </div>
          {availableSeats && (
            <div className="availability">
              <i className="fas fa-users"></i>
              <span>{availableSeats} seats left</span>
            </div>
          )}
        </div>
        {(startDate && endDate) && (
          <div className="date-info">
            <div className="date-item">
              <i className="far fa-calendar-alt"></i>
              <div>
                <span>Start Date</span>
                <p>{new Date(startDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="date-item">
              <i className="far fa-calendar-check"></i>
              <div>
                <span>End Date</span>
                <p>{new Date(endDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="booking-actions">
        <button className="book-now" onClick={onBook}>
          <i className="fas fa-ticket-alt"></i>
          Book Now
        </button>
        <button className="add-wishlist" onClick={onAddToWishlist}>
          <i className="far fa-heart"></i>
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default BookingCard;