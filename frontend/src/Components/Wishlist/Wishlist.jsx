import React from 'react';
import './Wishlist.css';

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: 'Mountain Adventure',
      location: 'Swiss Alps',
      price: 899,
      rating: 4.8,
      image: 'tour1.jpg',
      duration: '5 Days'
    },
    {
      id: 2,
      name: 'Beach Paradise',
      location: 'Maldives',
      price: 1299,
      rating: 4.9,
      image: 'tour2.jpg',
      duration: '7 Days'
    }
  ];

  return (
    <div className="wishlist">
      <div className="wishlist-header">
        <h3>My Wishlist</h3>
        <p>{wishlistItems.length} saved trips</p>
      </div>

      <div className="wishlist-grid">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-card">
            <div className="wishlist-image">
              <img src={item.image} alt={item.name} />
              <button className="remove-btn">
                <i className="fas fa-trash"></i>
              </button>
            </div>
            <div className="wishlist-content">
              <h4>{item.name}</h4>
              <div className="wishlist-info">
                <span><i className="fas fa-map-marker-alt"></i> {item.location}</span>
                <span><i className="fas fa-clock"></i> {item.duration}</span>
              </div>
              <div className="wishlist-footer">
                <div className="price-rating">
                  <span className="price">${item.price}</span>
                  <span className="rating">
                    <i className="fas fa-star"></i> {item.rating}
                  </span>
                </div>
                <button className="book-now">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 