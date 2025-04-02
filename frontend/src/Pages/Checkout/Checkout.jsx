import React, { useState } from 'react';
import { Check, CreditCard, Calendar, Mail, Phone, User, MapPin } from 'lucide-react';

// CSS styles directly in component
const styles = {
  container: {
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", sans-serif'
  },
  header: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '16px 0'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: '700',
    margin: 0
  },
  breadcrumb: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px'
  },
  breadcrumbActive: {
    color: '#2563eb',
    fontWeight: '500'
  },
  breadcrumbSeparator: {
    margin: '0 8px'
  },
  breadcrumbInactive: {
    color: '#6b7280'
  },
  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },
  twoColLayout: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },
  mainColumn: {
    flex: '2',
    width: '100%'
  },
  sidebarColumn: {
    flex: '1',
    width: '100%'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '24px'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginTop: 0,
    marginBottom: '16px'
  },
  formGroup: {
    marginBottom: '16px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px'
  },
  inputWrapper: {
    position: 'relative'
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  },
  input: {
    width: '100%',
    padding: '10px 10px 10px 36px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box'
  },
  inputNoIcon: {
    width: '100%',
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box'
  },
  inputFocus: {
    outline: 'none',
    borderColor: '#2563eb',
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.15)'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box'
  },
  button: {
    cursor: 'pointer',
    padding: '10px 24px',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    border: 'none'
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    color: 'white'
  },
  primaryButtonHover: {
    backgroundColor: '#1d4ed8'
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    color: '#374151'
  },
  secondaryButtonHover: {
    backgroundColor: '#e5e7eb'
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  borderBottom: {
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '16px',
    marginBottom: '16px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    padding: '8px 0'
  },
  summaryLabel: {
    color: '#6b7280'
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    fontSize: '18px',
    fontWeight: '700'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    marginBottom: '4px'
  },
  featureIcon: {
    color: '#10b981',
    marginRight: '8px'
  },
  paymentMethodGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
    marginBottom: '16px'
  },
  paymentMethodOption: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  paymentMethodSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#2563eb'
  },
  paymentMethodIcon: {
    color: '#2563eb',
    marginRight: '8px'
  },
  radioInput: {
    marginRight: '8px'
  },
  paymentInfoBox: {
    backgroundColor: '#eff6ff',
    borderRadius: '6px',
    padding: '16px',
    marginTop: '24px',
    marginBottom: '24px'
  },
  contactInfoText: {
    fontSize: '14px',
    marginBottom: '4px'
  },
  paymentInfoTitle: {
    fontWeight: '500',
    marginBottom: '8px'
  },
  note: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '16px'
  }
};

// Media query styles to be added to document head
const createMediaStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @media (min-width: 768px) {
      .form-grid-2col {
        grid-template-columns: 1fr 1fr;
      }
      
      .payment-method-grid {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
    
    @media (min-width: 1024px) {
      .two-col-layout {
        flex-direction: row;
      }
      
      .main-column {
        max-width: 66%;
      }
      
      .sidebar-column {
        max-width: 33%;
      }
      
      .sidebar-sticky {
        position: sticky;
        top: 24px;
      }
    }
    
    input:focus, textarea:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }
    
    .button-primary:hover {
      background-color: #1d4ed8;
    }
    
    .button-secondary:hover {
      background-color: #e5e7eb;
    }
  `;
  document.head.appendChild(style);
};

const Checkout = () => {
  // Add media query styles when component mounts
  React.useEffect(() => {
    createMediaStyles();
    return () => {
      // Clean up styles when component unmounts
      const style = document.querySelector('style');
      if (style) style.remove();
    };
  }, []);

  const [step, setStep] = useState(1); // 1 = Contact Info, 2 = Payment
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
    // In a real app, validate the form data here
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // In a real app, process payment here
    alert("Payment processed successfully! Your booking is confirmed.");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Travel Adventures</h1>
        </div>
      </header>

      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <span style={styles.breadcrumbActive}>Package Selection</span>
        <span style={styles.breadcrumbSeparator}>→</span>
        <span style={step >= 1 ? styles.breadcrumbActive : styles.breadcrumbInactive}>Contact Information</span>
        <span style={styles.breadcrumbSeparator}>→</span>
        <span style={step >= 2 ? styles.breadcrumbActive : styles.breadcrumbInactive}>Payment</span>
        <span style={styles.breadcrumbSeparator}>→</span>
        <span style={styles.breadcrumbInactive}>Confirmation</span>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.twoColLayout} className="two-col-layout">
          {/* Main Content */}
          <div style={styles.mainColumn} className="main-column">
            {step === 1 ? (
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>Contact Information</h2>
                <form onSubmit={handleSubmitContactInfo}>
                  <div style={styles.formGrid} className="form-grid-2col">
                    <div style={styles.formGroup}>
                      <label htmlFor="firstName" style={styles.label}>First Name</label>
                      <div style={styles.inputWrapper}>
                        <div style={styles.inputIcon}>
                          <User size={16} />
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          style={styles.input}
                          required
                        />
                      </div>
                    </div>
                    <div style={styles.formGroup}>
                      <label htmlFor="lastName" style={styles.label}>Last Name</label>
                      <div style={styles.inputWrapper}>
                        <div style={styles.inputIcon}>
                          <User size={16} />
                        </div>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          style={styles.input}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email Address</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <Mail size={16} />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="phone" style={styles.label}>Phone Number</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <Phone size={16} />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={styles.input}
                        required
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="address" style={styles.label}>Address</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <MapPin size={16} />
                      </div>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        style={styles.input}
                        required
                      />
                    </div>
                  </div>

                  <div style={styles.formGrid} className="form-grid-2col">
                    <div style={styles.formGroup}>
                      <label htmlFor="city" style={styles.label}>City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        style={styles.inputNoIcon}
                        required
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label htmlFor="country" style={styles.label}>Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        style={styles.inputNoIcon}
                        required
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="specialRequests" style={styles.label}>Special Requests (Optional)</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows="3"
                      style={styles.textarea}
                    ></textarea>
                  </div>

                  <div style={styles.flexEnd}>
                    <button
                      type="submit"
                      style={{...styles.button, ...styles.primaryButton}}
                      className="button-primary"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>Payment Information</h2>
                <form onSubmit={handlePaymentSubmit}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Payment Method</label>
                    <div style={styles.paymentMethodGrid} className="payment-method-grid">
                      <label 
                        style={{
                          ...styles.paymentMethodOption,
                          ...(formData.paymentMethod === 'credit-card' ? styles.paymentMethodSelected : {})
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleChange}
                          style={styles.radioInput}
                        />
                        <CreditCard size={16} style={styles.paymentMethodIcon} />
                        <span>Credit Card</span>
                      </label>
                      <label 
                        style={{
                          ...styles.paymentMethodOption,
                          ...(formData.paymentMethod === 'paypal' ? styles.paymentMethodSelected : {})
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          style={styles.radioInput}
                        />
                        <span>PayPal</span>
                      </label>
                      <label 
                        style={{
                          ...styles.paymentMethodOption,
                          ...(formData.paymentMethod === 'bank-transfer' ? styles.paymentMethodSelected : {})
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank-transfer"
                          checked={formData.paymentMethod === 'bank-transfer'}
                          onChange={handleChange}
                          style={styles.radioInput}
                        />
                        <span>Bank Transfer</span>
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === 'credit-card' && (
                    <>
                      <div style={styles.formGroup}>
                        <label htmlFor="cardNumber" style={styles.label}>Card Number</label>
                        <div style={styles.inputWrapper}>
                          <div style={styles.inputIcon}>
                            <CreditCard size={16} />
                          </div>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            style={styles.input}
                            required
                          />
                        </div>
                      </div>

                      <div style={styles.formGroup}>
                        <label htmlFor="cardHolder" style={styles.label}>Card Holder Name</label>
                        <div style={styles.inputWrapper}>
                          <div style={styles.inputIcon}>
                            <User size={16} />
                          </div>
                          <input
                            type="text"
                            id="cardHolder"
                            name="cardHolder"
                            value={formData.cardHolder}
                            onChange={handleChange}
                            style={styles.input}
                            required
                          />
                        </div>
                      </div>

                      <div style={styles.formGrid} className="form-grid-2col">
                        <div style={styles.formGroup}>
                          <label htmlFor="expiryDate" style={styles.label}>Expiry Date</label>
                          <div style={styles.inputWrapper}>
                            <div style={styles.inputIcon}>
                              <Calendar size={16} />
                            </div>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              style={styles.input}
                              required
                            />
                          </div>
                        </div>
                        <div style={styles.formGroup}>
                          <label htmlFor="cvv" style={styles.label}>CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            style={styles.inputNoIcon}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {formData.paymentMethod === 'paypal' && (
                    <div style={styles.paymentInfoBox}>
                      <p style={{textAlign: 'center'}}>You will be redirected to PayPal to complete your payment after you click "Complete Booking".</p>
                    </div>
                  )}

                  {formData.paymentMethod === 'bank-transfer' && (
                    <div style={styles.paymentInfoBox}>
                      <h3 style={styles.paymentInfoTitle}>Bank Transfer Details:</h3>
                      <p style={styles.contactInfoText}>Bank: Global Bank</p>
                      <p style={styles.contactInfoText}>Account Name: Travel Adventures</p>
                      <p style={styles.contactInfoText}>Account Number: 1234567890</p>
                      <p style={styles.contactInfoText}>SWIFT/BIC: GLBANK123</p>
                      <p style={styles.note}>Please include your booking reference in the transfer description.</p>
                    </div>
                  )}

                  <div style={styles.flexBetween}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{...styles.button, ...styles.secondaryButton}}
                      className="button-secondary"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      style={{...styles.button, ...styles.primaryButton}}
                      className="button-primary"
                    >
                      Complete Booking
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div style={styles.sidebarColumn} className="sidebar-column">
            <div style={styles.card} className="sidebar-sticky">
              <h2 style={styles.cardTitle}>Order Summary</h2>
              
              <div style={styles.borderBottom}>
                <h3 style={{fontWeight: '500', marginBottom: '8px'}}>{tourPackage.name}</h3>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Duration:</span>
                  <span>{tourPackage.duration}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Start Date:</span>
                  <span>{tourPackage.startDate}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Travelers:</span>
                  <span>{tourPackage.travelers}</span>
                </div>
              </div>

              {step === 2 && (
                <div style={styles.borderBottom}>
                  <h3 style={{fontWeight: '500', marginBottom: '8px'}}>Contact Information</h3>
                  <div>
                    <p style={styles.contactInfoText}>
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p style={styles.contactInfoText}>{formData.email}</p>
                    <p style={styles.contactInfoText}>{formData.phone}</p>
                    <p style={styles.contactInfoText}>
                      {formData.address}, {formData.city}, {formData.country}
                    </p>
                  </div>
                </div>
              )}

              <div style={styles.borderBottom}>
                <div style={styles.summaryRow}>
                  <span style={{fontWeight: '500'}}>Subtotal</span>
                  <span>{tourPackage.currency} {tourPackage.price}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Taxes & Fees (10%)</span>
                  <span>{tourPackage.currency} {(tourPackage.price * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div style={styles.summaryTotal}>
                <span>Total</span>
                <span>{tourPackage.currency} {(tourPackage.price * 1.1).toFixed(2)}</span>
              </div>

              <div style={{marginTop: '16px'}}>
                <p style={styles.featureItem}>
                  <Check size={16} style={styles.featureIcon} />
                  Free cancellation up to 7 days before the tour
                </p>
                <p style={styles.featureItem}>
                  <Check size={16} style={styles.featureIcon} />
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