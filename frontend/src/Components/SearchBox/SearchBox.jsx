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
          <select 
            className="search-category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
          </select>
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
  );
};

export default SearchBox;

