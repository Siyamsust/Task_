import React from 'react';
import './FeaturedTours.css';
import t1 from '../../Assets/task1.jpg'
import t2 from '../../Assets/task2.jpg'
const FeaturedTours = () => {
    return (
      <div className="featured-tours">
        <h3>Featured Tours</h3>
        <div className="tour-cards">
          <div className="tour-card">
            <img src={t1} alt="Tour 1" />
            <p>Tour 1</p>
            <span>Rating: 4.5</span>
            <span>Price: $299</span>
          </div>
          <div className="tour-card">
            <img src={t2} alt="Tour 2" />
            <p>Tour 2</p>
            <span>Rating: 4.8</span>
            <span>Price: $399</span>
          </div>
        </div>
      </div>
    );
  };
  export default FeaturedTours