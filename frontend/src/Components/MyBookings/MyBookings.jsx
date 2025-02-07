import React from 'react';

function MyBookings() {
  return (
    <div className="my-bookings">
      <h3>My Bookings</h3>
      <div className="tabs">
        <button>Upcoming</button>
        <button>Past</button>
      </div>
      <div className="bookings-list">
        {/* Example bookings */}
        <div className="booking-item">Booking 1</div>
        <div className="booking-item">Booking 2</div>
      </div>
    </div>
  );
}

export default MyBookings;
