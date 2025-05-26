import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../HeroSection/HeroSection.css';
const SearchBox = ({ onSearch }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const handleSearch = () => {
        navigate(`/search?query=${searchTerm}&category=${category}`);
      };
    
  return (
    <div className="search-box">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Search destinations, tours, or activities..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
  );
};

export default SearchBox;

