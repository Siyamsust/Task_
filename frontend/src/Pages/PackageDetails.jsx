import React from 'react';
import './CSS/PackageDetails.css';

const PackageDetails = ({ tour }) => {
  // Dummy data for a package (replace this with actual props or API data)
  const {
    image,
    title,
    rating,
    price,
    description,
    itinerary,
    duration,
    location,
  } = tour || {
    image: require('../../Assets/task1.jpg'), // Replace with the selected image
    title: 'Tour 1',
    rating: 4.5,
    price: 299,
    description:
      'This tour offers an amazing experience exploring scenic landscapes and rich cultural heritage. A perfect getaway for adventure lovers.',
    itinerary: [
      'Day 1: Arrival and city tour',
      'Day 2: Mountain hiking',
      'Day 3: Cultural exploration',
      'Day 4: Departure',
    ],
    duration: '4 Days, 3 Nights',
    location: 'Rocky Mountains, USA',
  };

  return (
    <div className="package-details">
      <div className="details-header">
        <img src={image} alt={title} className="details-image" />
        <div className="details-info">
          <h2>{title}</h2>
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Duration:</strong> {duration}
          </p>
          <p>
            <strong>Rating:</strong> {rating} ⭐
          </p>
          <p>
            <strong>Price:</strong> ${price}
          </p>
          <button className="book-now">Book Now</button>
        </div>
      </div>

      <div className="details-content">
        <h3>Description</h3>
        <p>{description}</p>

        <h3>Itinerary</h3>
        <ul>
          {itinerary.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageDetails;
