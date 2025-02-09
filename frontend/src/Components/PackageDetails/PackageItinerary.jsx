import React from 'react';
import './PackageItinerary.css';

const PackageItinerary = ({ itinerary }) => {
  return (
    <div className="itinerary-section">
      <h2>Itinerary</h2>
      <div className="timeline">
        {itinerary.map((day) => (
          <div key={day.day} className="timeline-item">
            <div className="day-number">Day {day.day}</div>
            <div className="day-content">
              <h3>{day.title}</h3>
              <p>{day.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageItinerary; 