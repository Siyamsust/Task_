import React, { useState } from 'react';
import './MyTrips.css';

const MyTrips = () => {
  const [filter, setFilter] = useState('all');
  const trips = [
    {
      id: 1,
      name: 'Swiss Alps Trek',
      date: '2024-03-15',
      status: 'Upcoming',
      image: 'https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b',
      location: 'Switzerland',
      price: 1299
    },
    {
      id: 2,
      name: 'Beach Paradise',
      date: '2023-12-10',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb',
      location: 'Maldives',
      price: 2499
    }
  ];

  const filteredTrips = filter === 'all' 
    ? trips 
    : trips.filter(trip => trip.status.toLowerCase() === filter);

  return (
    <div className="my-trips">
      <div className="trips-header">
        <h3>My Trips</h3>
        <div className="trip-filters">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'upcoming' ? 'active' : ''} 
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="trips-grid">
        {filteredTrips.map(trip => (
          <div key={trip.id} className="trip-card">
            <div className="trip-image">
              <img src={trip.image} alt={trip.name} />
              <span className={`status ${trip.status.toLowerCase()}`}>
                {trip.status}
              </span>
            </div>
            <div className="trip-details">
              <h4>{trip.name}</h4>
              <div className="trip-info">
                <span><i className="fas fa-map-marker-alt"></i> {trip.location}</span>
                <span><i className="fas fa-calendar"></i> {new Date(trip.date).toLocaleDateString()}</span>
              </div>
              <div className="trip-footer">
                <span className="price">${trip.price}</span>
                <button className="view-details">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTrips; 