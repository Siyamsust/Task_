import React from 'react';
import './HeroSection.css';

const HeroSection = ({ onSearch }) => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Discover Your Next Adventure</h1>
        <p>Explore unique tour packages from verified tour companies worldwide</p>
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Search destinations, tours, or activities..."
            onChange={(e) => onSearch(e.target.value)}
          />
          <select className="search-category">
            <option value="">All Categories</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
          </select>
          <button className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 