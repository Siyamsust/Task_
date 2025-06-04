import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ToursContext } from '../../Context/ToursContext';
import { useAuth } from '../../Context/AuthContext';
import Breadcrumb from './Breadcrumb';
import ContactInfoForm from './ContactInfoForm';
import PaymentInfoForm from './PaymentInfoForm';
import OrderSummary from './OrderSummary';
import './Checkout.css';

const Checkout = () => {
  const [step, setStep] = useState(1); 
  const { tourId } = useParams();
  const { tours = [], loading } = useContext(ToursContext);
  const { user } = useAuth(); 
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    specialRequests: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    travelers: 1, // Add travelers count
  });

  // Find the actual tour from context
  const selectedTour = tours.find(tour => tour._id === tourId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitContactInfo = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const bookingResponse = await fetch('http://localhost:4000/api/bookings/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: user?.user?.email,
          tourId: tourId,
          startDate: selectedTour?.startDate || new Date().toISOString(),
          travelers: formData.travelers
        })
      });

      const bookingData = await bookingResponse.json();

      if (!bookingResponse.ok) {
        throw new Error(bookingData.message || 'Failed to save booking');
      }

      // Increment booking count
      await fetch(`http://localhost:4000/api/tours/${tourId}/increment-booking`, {
        method: 'PATCH'
      });

      alert("Payment processed successfully! Your booking is confirmed.");
    } catch (err) {
      console.error("Error confirming booking:", err);
      alert("Failed to confirm booking. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="checkout-container">
        <div className="main-content">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Loading tour details...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedTour) {
    return (
      <div className="checkout-container">
        <div className="main-content">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Tour not found</h2>
            <p>The requested tour could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <Breadcrumb step={step} />
      
      <div className="main-content">
        <div className="two-col-layout">
          <div className="main-column">
            {step === 1 ? (
              <ContactInfoForm 
                formData={formData} 
                handleChange={handleChange} 
                handleSubmitContactInfo={handleSubmitContactInfo}
                selectedTour={selectedTour}
              />
            ) : (
              <PaymentInfoForm 
                formData={formData} 
                handleChange={handleChange} 
                handlePaymentSubmit={handlePaymentSubmit} 
                setStep={setStep}
              />
            )}
          </div>
          
          <div className="sidebar-column">
            <OrderSummary 
              selectedTour={selectedTour} 
              formData={formData} 
              step={step} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;