import React from 'react';
import './BookingCard.css';

const BookingCard = ({ price, onBook, onAddToWishlist }) => {
  return (
    <div className="booking-card">
      <div className="price">
        <span>From</span>
        <h2>${price}</h2>
        <span>per person</span>
      </div>
      <button className="book-now" onClick={onBook}>Book Now</button>
      <button className="add-wishlist" onClick={onAddToWishlist}>
        <i className="far fa-heart"></i> Add to Wishlist
      </button>
    </div>
  );
};

export default BookingCard; 