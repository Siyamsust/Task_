import React, { useState } from 'react';
import './TourApproval.css';

const TourApproval = () => {
  const [tours, setTours] = useState([
    { id: 1, name: 'Tour to Paris', status: 'pending' },
    { id: 2, name: 'Tour to Tokyo', status: 'pending' },
  ]);

  const handleApprove = (id) => {
    setTours(tours.map((tour) => (tour.id === id ? { ...tour, status: 'approved' } : tour)));
  };

  const handleReject = (id) => {
    setTours(tours.map((tour) => (tour.id === id ? { ...tour, status: 'rejected' } : tour)));
  };

  return (
    <div className="tour-approval">
      <h2>Tour Approval</h2>
      <ul>
        {tours.map((tour) => (
          <li key={tour.id} className="tour-card">
            <h3>{tour.name}</h3>
            <p>Status: {tour.status}</p>
            <button onClick={() => handleApprove(tour.id)}>Approve</button>
            <button onClick={() => handleReject(tour.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourApproval;
