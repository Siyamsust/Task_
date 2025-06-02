import React, { useState } from 'react';
import { Check, CreditCard, Calendar, Mail, Phone, User, MapPin } from 'lucide-react';
import './Checkout.css';
import { ToursContext } from '../../Context/ToursContext';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
const Checkout = () => {
  const [step, setStep] = useState(1); // 1 = Contact Info, 2 = Payment
  const { tourId } = useParams();
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
  });

  // Sample tour package details
  const tourPackage = {
    name: "Golden Triangle Tour",
    duration: "7 Days / 6 Nights",
    startDate: "April 15, 2025",
    price: 1299,
    currency: "USD",
    travelers: 2,
  };

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
    // ✅ Save booking after successful payment
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
        startDate: new Date().toISOString()  // or a selected startDate if available
      })
    });

    const bookingData = await bookingResponse.json();

    if (!bookingResponse.ok) {
      throw new Error(bookingData.message || 'Failed to save booking');
    }

    // ✅ Increment the booking count (optional)
    await fetch(`http://localhost:4000/api/tours/${tourId}/increment-booking`, {
      method: 'PATCH'
    });

    alert("Payment processed successfully! Your booking is confirmed.");
  } catch (err) {
    console.error("Error confirming booking:", err);
    alert("Failed to confirm booking. Please try again.");
  }
};



  return (
    <div className="checkout-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="breadcrumb-active">Package Selection</span>
        <span className="breadcrumb-separator">→</span>
        <span className={step >= 1 ? 'breadcrumb-active' : 'breadcrumb-inactive'}>Contact Information</span>
        <span className="breadcrumb-separator">→</span>
        <span className={step >= 2 ? 'breadcrumb-active' : 'breadcrumb-inactive'}>Payment</span>
        <span className="breadcrumb-separator">→</span>
        <span className="breadcrumb-inactive">Confirmation</span>
      </div>

      <div className="main-content">
        <div className="two-col-layout">
          {/* Main Content */}
          <div className="main-column">
            {step === 1 ? (
              <div className="card">
                <h2 className="card-title">Contact Information</h2>
                <form onSubmit={handleSubmitContactInfo}>
                  <div className="form-grid form-grid-2col">
                    <div className="form-group">
                      <label htmlFor="firstName" className="label">First Name</label>
                      <div className="input-wrapper">
                        <div className="input-icon">
                          <User size={16} />
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="input"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName" className="label">Last Name</label>
                      <div className="input-wrapper">
                        <div className="input-icon">
                          <User size={16} />
                        </div>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="input"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="label">Email Address</label>
                    <div className="input-wrapper">
                      <div className="input-icon">
                        <Mail size={16} />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="label">Phone Number</label>
                    <div className="input-wrapper">
                      <div className="input-icon">
                        <Phone size={16} />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address" className="label">Address</label>
                    <div className="input-wrapper">
                      <div className="input-icon">
                        <MapPin size={16} />
                      </div>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-grid form-grid-2col">
                    <div className="form-group">
                      <label htmlFor="city" className="label">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="input-no-icon"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country" className="label">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="input-no-icon"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="specialRequests" className="label">Special Requests (Optional)</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows="3"
                      className="textarea"
                    ></textarea>
                  </div>

                  <div className="flex-end">
                    <button type="submit" className="button button-primary">
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="card">
                <h2 className="card-title">Payment Information</h2>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="form-group">
                    <label className="label">Payment Method</label>
                    <div className="payment-method-grid">
                      <label className={`payment-method-option ${formData.paymentMethod === 'credit-card' ? 'payment-method-selected' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleChange}
                          className="radio-input"
                        />
                        <CreditCard size={16} className="payment-method-icon" />
                        <span>Credit Card</span>
                      </label>
                      <label className={`payment-method-option ${formData.paymentMethod === 'paypal' ? 'payment-method-selected' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          className="radio-input"
                        />
                        <span>PayPal</span>
                      </label>
                      <label className={`payment-method-option ${formData.paymentMethod === 'bank-transfer' ? 'payment-method-selected' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank-transfer"
                          checked={formData.paymentMethod === 'bank-transfer'}
                          onChange={handleChange}
                          className="radio-input"
                        />
                        <span>Bank Transfer</span>
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === 'credit-card' && (
                    <>
                      <div className="form-group">
                        <label htmlFor="cardNumber" className="label">Card Number</label>
                        <div className="input-wrapper">
                          <div className="input-icon">
                            <CreditCard size={16} />
                          </div>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            className="input"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="cardHolder" className="label">Card Holder Name</label>
                        <div className="input-wrapper">
                          <div className="input-icon">
                            <User size={16} />
                          </div>
                          <input
                            type="text"
                            id="cardHolder"
                            name="cardHolder"
                            value={formData.cardHolder}
                            onChange={handleChange}
                            className="input"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-grid form-grid-2col">
                        <div className="form-group">
                          <label htmlFor="expiryDate" className="label">Expiry Date</label>
                          <div className="input-wrapper">
                            <div className="input-icon">
                              <Calendar size={16} />
                            </div>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              className="input"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="cvv" className="label">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            className="input-no-icon"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {formData.paymentMethod === 'paypal' && (
                    <div className="payment-info-box">
                      <p style={{textAlign: 'center'}}>You will be redirected to PayPal to complete your payment after you click "Complete Booking".</p>
                    </div>
                  )}

                  {formData.paymentMethod === 'bank-transfer' && (
                    <div className="payment-info-box">
                      <h3 className="payment-info-title">Bank Transfer Details:</h3>
                      <p className="contact-info-text">Bank: Global Bank</p>
                      <p className="contact-info-text">Account Name: Travel Adventures</p>
                      <p className="contact-info-text">Account Number: 1234567890</p>
                      <p className="contact-info-text">SWIFT/BIC: GLBANK123</p>
                      <p className="note">Please include your booking reference in the transfer description.</p>
                    </div>
                  )}

                  <div className="flex-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="button button-secondary"
                    >
                      Back
                    </button>
                    <button type="submit" className="button button-primary">
                      Complete Booking
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="sidebar-column">
            <div className="card sidebar-sticky">
              <h2 className="card-title">Order Summary</h2>
              
              <div className="border-bottom">
                <h3 className="summary-package-title">{tourPackage.name}</h3>
                <div className="summary-row">
                  <span className="summary-label">Duration:</span>
                  <span>{tourPackage.duration}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Start Date:</span>
                  <span>{tourPackage.startDate}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Travelers:</span>
                  <span>{tourPackage.travelers}</span>
                </div>
              </div>

              {step === 2 && (
                <div className="border-bottom">
                  <h3 className="summary-package-title">Contact Information</h3>
                  <div>
                    <p className="contact-info-text">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="contact-info-text">{formData.email}</p>
                    <p className="contact-info-text">{formData.phone}</p>
                    <p className="contact-info-text">
                      {formData.address}, {formData.city}, {formData.country}
                    </p>
                  </div>
                </div>
              )}

              <div className="border-bottom">
                <div className="summary-row">
                  <span className="summary-subtotal">Subtotal</span>
                  <span>{tourPackage.currency} {tourPackage.price}</span>
                </div>
                <div className="summary-row">
                  <span>Taxes & Fees (10%)</span>
                  <span>{tourPackage.currency} {(tourPackage.price * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>{tourPackage.currency} {(tourPackage.price * 1.1).toFixed(2)}</span>
              </div>

              <div className="features-section">
                <p className="feature-item">
                  <Check size={16} className="feature-icon" />
                  Free cancellation up to 7 days before the tour
                </p>
                <p className="feature-item">
                  <Check size={16} className="feature-icon" />
                  24/7 customer support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;