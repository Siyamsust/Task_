import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchFilter.css';
import TourImage from '../../Components/Assets/istockphoto-1493543684-612x612.jpg';
import SearchBox from '../../Components/SearchBox/SearchBox';

const SearchFilter = () => {
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState(50000);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container">
      <div className="search-container">
        <SearchBox onSearch={setSearchQuery} />
      </div>
      
      <div className="main-content">
        {/* Filter Sidebar */}
        <aside className="filter-sidebar">
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-range">
              <input 
                type="range" 
                className="price-slider" 
                min="0" 
                max="100000" 
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              <div className="price-values">
                <span>৳0</span> - <span>৳{priceRange.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3>Tour Type</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input type="checkbox" /> Adventure
              </label>
              <label className="filter-option">
                <input type="checkbox" /> Beach
              </label>
              <label className="filter-option">
                <input type="checkbox" /> Mountain
              </label>
              <label className="filter-option">
                <input type="checkbox" /> Historical
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Duration</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input type="checkbox" /> 1-2 Days
              </label>
              <label className="filter-option">
                <input type="checkbox" /> 3-5 Days
              </label>
              <label className="filter-option">
                <input type="checkbox" /> 5+ Days
              </label>
            </div>
          </div>
        </aside>

        {/* Tour Results */}
        <main className="tour-results">
          <div className="results-header">
            <h2>12 Tours Found</h2>
            <select className="sort-dropdown">
              <option>Lowest Price</option>
              <option>Highest Price</option>
              <option>Popularity</option>
            </select>
          </div>

          <div className="tour-grid">
            {/* Tour Card 1 */}
            <div className="tour-card">
              <img src={TourImage} alt="Sundarban" className="tour-image" />
              <div className="tour-details">
                <h3 className="tour-title">Sundarban Adventure</h3>
                <p>3 Days 2 Nights</p>
                <div className="tour-info">
                  <span>Rating: ⭐⭐⭐⭐⭐</span>
                  <span className="tour-price">৳12,000</span>
                </div>
              </div>
            </div>

            {/* Tour Card 2 */}
            <div className="tour-card">
              <img src={TourImage} alt="Cox's Bazar" className="tour-image" />
              <div className="tour-details">
                <h3 className="tour-title">Cox's Bazar Sea Beach</h3>
                <p>4 Days 3 Nights</p>
                <div className="tour-info">
                  <span>Rating: ⭐⭐⭐⭐</span>
                  <span className="tour-price">৳15,000</span>
                </div>
              </div>
            </div>

            {/* Tour Card 3 */}
            <div className="tour-card">
              <img src={TourImage} alt="Sajek" className="tour-image" />
              <div className="tour-details">
                <h3 className="tour-title">Sajek Valley Tour</h3>
                <p>3 Days 2 Nights</p>
                <div className="tour-info">
                  <span>Rating: ⭐⭐⭐⭐⭐</span>
                  <span className="tour-price">৳8,000</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchFilter; 