import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AllBookingsList.css';

const AllBookingsList = () => {
  const [tours, setTours] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('tours'); // 'tours' or 'all'

  useEffect(() => {
    fetchToursWithBookings();
  }, []);

  const fetchToursWithBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch all tours for this company
      const toursResponse = await fetch('http://localhost:4000/api/tours', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const toursData = await toursResponse.json();
      
      if (toursData.success) {
        // Fetch booking count for each tour
        const toursWithBookings = await Promise.all(
          toursData.tours.map(async (tour) => {
            try {
              const bookingsResponse = await fetch(
                `http://localhost:4000/api/bookings/tour/${tour._id}?limit=1`,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }
              );
              const bookingsData = await bookingsResponse.json();
              
              return {
                ...tour,
                bookingCount: bookingsData.total || 0,
                totalRevenue: bookingsData.bookings?.reduce((sum, booking) => 
                  sum + (booking.totalAmount || 0), 0) || 0
              };
            } catch (error) {
              return { ...tour, bookingCount: 0, totalRevenue: 0 };
            }
          })
        );
        
        setTours(toursWithBookings);
      }
    } catch (error) {
      console.error('Error fetching tours with bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/bookings/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setAllBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error fetching all bookings:', error);
    }
  };

  useEffect(() => {
    if (view === 'all') {
      fetchAllBookings();
    }
  }, [view]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="all-bookings-container">
      <div className="header">
        <h1>Bookings Management</h1>
        <div className="view-toggle">
          <button 
            className={view === 'tours' ? 'active' : ''}
            onClick={() => setView('tours')}
          >
            By Tours
          </button>
          <button 
            className={view === 'all' ? 'active' : ''}
            onClick={() => setView('all')}
          >
            All Bookings
          </button>
        </div>
      </div>

      {view === 'tours' ? (
        <div className="tours-overview">
          <div className="summary-cards">
            <div className="summary-card">
              <h3>Total Tours</h3>
              <p className="number">{tours.length}</p>
            </div>
            <div className="summary-card">
              <h3>Total Bookings</h3>
              <p className="number">{tours.reduce((sum, tour) => sum + tour.bookingCount, 0)}</p>
            </div>
            <div className="summary-card">
              <h3>Total Revenue</h3>
              <p className="number">${tours.reduce((sum, tour) => sum + tour.totalRevenue, 0)}</p>
            </div>
          </div>

          <div className="tours-grid">
            {tours.map((tour) => (
              <div key={tour._id} className="tour-card">
                <div className="tour-image">
                  {tour.images && tour.images.length > 0 ? (
                    <img 
                      src={`http://localhost:4000/uploads/${tour.images[0]}`} 
                      alt={tour.title}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="tour-info">
                  <h3>{tour.title}</h3>
                  <p className="location">{tour.location}</p>
                  <div className="stats">
                    <span className="bookings">
                      📋 {tour.bookingCount} bookings
                    </span>
                    <span className="revenue">
                      💰 ${tour.totalRevenue}
                    </span>
                  </div>
                  <div className="actions">
                    <Link 
                      to={`/bookings/${tour._id}`}
                      className="btn btn-primary"
                    >
                      View Bookings
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="all-bookings-view">
          <div className="bookings-table">
            <table>
              <thead>
                <tr>
                  <th>Booking Ref</th>
                  <th>Tour</th>
                  <th>Customer</th>
                  <th>Travelers</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.bookingReference}</td>
                    <td>{booking.tour?.title || 'N/A'}</td>
                    <td>
                      <div>
                        <strong>{booking.customerName}</strong>
                        <br />
                        <small>{booking.email}</small>
                      </div>
                    </td>
                    <td>{booking.travelers}</td>
                    <td>${booking.totalAmount}</td>
                    <td>
                      <span className={`status ${booking.bookingStatus}`}>
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td>
                      <Link 
                        to={`/bookings/${booking.tour?._id}`}
                        className="btn btn-small"
                      >
                        View Tour
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBookingsList;