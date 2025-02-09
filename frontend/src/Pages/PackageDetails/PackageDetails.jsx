import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToursContext } from '../../Context/ToursContext';
import PackageGallery from '../../Components/PackageDetails/PackageGallery';
import PackageInfo from '../../Components/PackageDetails/PackageInfo';
import PackageItinerary from '../../Components/PackageDetails/PackageItinerary';
import BookingCard from '../../Components/PackageDetails/BookingCard';
import './PackageDetails.css';

const PackageDetails = () => {
  const { id } = useParams();
  const { tours, loading, error } = useContext(ToursContext);
  const [activeImage, setActiveImage] = useState(0);

  // Find the tour or use default data
  const tour = tours?.find(t => t._id === id) || {
    name: 'Mountain Trek Adventure',
    location: 'Swiss Alps',
    duration: '5 Days',
    price: 899,
    rating: 4.8,
    images: ['tour1.jpg'],
    description: 'Experience the breathtaking views of the Swiss Alps...',
    companyId: '123',
    companyName: 'Alpine Adventures',
    companyLogo: '/company-logo.png',
    included: ['Professional Guide', 'Accommodation', 'Meals', 'Transport'],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Welcome meeting and briefing' },
      { day: 2, title: 'Trek Begins', description: 'Start the mountain trek' }
    ]
  };

  const handleBook = () => {
    // Booking logic
  };

  const handleAddToWishlist = () => {
    // Wishlist logic
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tour details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>Error loading tour details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="package-details">
      <PackageGallery 
        images={tour.images}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
      />

      <div className="package-content">
        <div className="main-content">
          <PackageInfo tour={tour} companyId={tour.companyId} />
          <PackageItinerary itinerary={tour.itinerary} />
        </div>

        <BookingCard 
          price={tour.price}
          onBook={handleBook}
          onAddToWishlist={handleAddToWishlist}
        />
      </div>
    </div>
  );
};

export default PackageDetails; 