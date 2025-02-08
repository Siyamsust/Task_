import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ToursContext } from '../../Context/ToursContext';
import './PackageDetails.css';

const PackageDetails = () => {
  const { id } = useParams();
  const { tours } = useContext(ToursContext);
  const [activeImage, setActiveImage] = useState(0);

  const tour = tours?.find(t => t._id === id) || {
    name: 'Mountain Trek Adventure',
    location: 'Swiss Alps',
    duration: '5 Days',
    price: 899,
    rating: 4.8,
    images: ['tour1.jpg'],
    description: 'Experience the breathtaking views of the Swiss Alps...',
    included: ['Professional Guide', 'Accommodation', 'Meals', 'Transport'],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Welcome meeting and briefing' },
      { day: 2, title: 'Trek Begins', description: 'Start the mountain trek' }
    ]
  };

  return (
    <div className="package-details">
      <div className="image-gallery">
        <img 
          src={`http://localhost:4000/${tour.images[activeImage]}`} 
          alt={tour.name} 
          className="main-image"
        />
        <div className="image-thumbnails">
          {tour.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:4000/${img}`}
              alt={`${tour.name} ${index + 1}`}
              className={activeImage === index ? 'active' : ''}
              onClick={() => setActiveImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="package-content">
        <div className="package-info">
          <h1>{tour.name}</h1>
          <div className="meta-info">
            <span><i className="fas fa-map-marker-alt"></i> {tour.location}</span>
            <span><i className="fas fa-clock"></i> {tour.duration}</span>
            <span><i className="fas fa-star"></i> {tour.rating}</span>
          </div>
          <p className="description">{tour.description}</p>

          <div className="included-section">
            <h2>What's Included</h2>
            <ul>
              {tour.included.map((item, index) => (
                <li key={index}>
                  <i className="fas fa-check"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="itinerary-section">
            <h2>Itinerary</h2>
            <div className="timeline">
              {tour.itinerary.map((day) => (
                <div key={day.day} className="timeline-item">
                  <div className="day-number">Day {day.day}</div>
                  <div className="day-content">
                    <h3>{day.title}</h3>
                    <p>{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="booking-card">
          <div className="price">
            <span>From</span>
            <h2>${tour.price}</h2>
            <span>per person</span>
          </div>
          <button className="book-now">Book Now</button>
          <button className="add-wishlist">
            <i className="far fa-heart"></i> Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails; 