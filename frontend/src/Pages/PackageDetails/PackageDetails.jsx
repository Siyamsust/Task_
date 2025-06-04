import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ToursContext } from '../../Context/ToursContext';
import PackageGallery from '../../Components/PackageDetails/PackageGallery';
import PackageInfo from '../../Components/PackageDetails/PackageInfo';
import BookingCard from '../../Components/PackageDetails/BookingCard';
import './PackageDetails.css';
const PackageDetails = () => {
  const { id } = useParams();
  
  const { tours, loading, error, fetchTourById } = useContext(ToursContext);
  const [tour, setTour] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState(null);
  const [activeImage, setActiveImage] = useState(0); // Add this state

  useEffect(() => {
    const getTour = async () => {
      try {
        setLocalLoading(true);
        const data = await fetchTourById(id);
        setTour(data);
        setLocalError(null);
        setActiveImage(0); // Reset active image when new tour loads
      } catch (err) {
        setLocalError('Failed to load tour details.');
      } finally {
        setLocalLoading(false);
      }
    };

    if (!tour) {
      getTour();
    }
  }, [id, fetchTourById, tour]);

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

      {/* Booking Card Section */}
      <div className="booking-section">
        <BookingCard 
          price={tour.price}
          availableSeats={tour.availableSeats}
          startDate={tour.startDate}
          endDate={tour.endDate}
          tourId={tour._id}
        />
      </div>
    </div>
  );
};

export default PackageDetails;