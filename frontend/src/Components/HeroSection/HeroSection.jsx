import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Discover Your Next Adventure</h1>
        <p>Explore the world's best destinations and experiences</p>
        
        {/* Search Box */}
        <div className="hero-search-container">
          <div className="hero-search-box">
            <div className="search-icon">
              <i className="fas fa-search"></i>
            </div>
            <input 
              type="text" 
              placeholder="Where would you like to go?"
              readOnly
              onClick={() => window.location.href = '/search'}
            />
            <button className="search-btn" onClick={() => window.location.href = '/search'}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;