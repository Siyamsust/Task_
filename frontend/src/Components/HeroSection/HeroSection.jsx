import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import SearchBox from '../SearchBox/SearchBox';

const HeroSection = ({ onSearch }) => {
  

  return (
    
    <div className="hero-section">
      <div className="hero-content">
        <h1>Discover Your Next Adventure</h1>
        <p>Explore unique tour packages from verified tour companies worldwide</p>
        <SearchBox onSearch={onSearch}/>
      </div>
    </div>
  );
};

export default HeroSection; 