import React from 'react';
import { Link } from 'react-router-dom';
import './PopularTours.css';

const PopularTours = ({ filter, searchQuery }) => {
  // This would typically come from your API/context
  const tours = [
    {
      _id: '1',
      name: 'Mountain Trek Adventure',
      location: 'Swiss Alps',
      duration: '5 Days',
      price: 899,
      rating: 4.8,
      images: ['tour1.jpg'],
      featured: true,
      trending: true
    },
    // Add more tour objects
  ];

  return (
    <div className="popular-tours">
      {tours.map((tour) => (
        <Link to={`/package/${tour._id}`} key={tour._id} className="tour-card">
          <div className="tour-image">
            <img src={`http://localhost:4000/${tour.images[0]}`} alt={tour.name} />
            {tour.featured && <span className="badge featured">Featured</span>}
            {tour.trending && <span className="badge trending">Trending</span>}
          </div>
          <div className="tour-content">
            <h3>{tour.name}</h3>
            <div className="tour-info">
              <span><i className="fas fa-map-marker-alt"></i> {tour.location}</span>
              <span><i className="fas fa-clock"></i> {tour.duration}</span>
            </div>
            <div className="tour-footer">
              <div className="tour-rating">
                <i className="fas fa-star"></i>
                <span>{tour.rating}</span>
              </div>
              <div className="tour-price">
                <span>From</span>
                <strong>${tour.price}</strong>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PopularTours; 