// PopularTours.jsx
import React, { useState, useContext } from 'react';
import { ToursContext } from '../../Context/ToursContext';
import PackageGrid from '../../Components/PackageGrid/PackageGrid';
import './PopularTours.css';

const PopularTours = () => {
  const { tours = [], loading } = useContext(ToursContext); // Default to an empty array
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'All Packages' },
    { id: 'trending', label: 'Trending' },
    { id: 'featured', label: 'Featured' },
    { id: 'new', label: 'New Arrivals' }
  ];

  const filteredPackages = tours.filter(tour => {
    if (searchQuery) {
      const name = tour.name || ''; // Default to an empty string if undefined
      const location = tour.location || ''; // Default to an empty string if undefined
      return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             location.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="popular-packages">
      {/* Header Section */}
      <div className="packages-header">
        <div className="packages-header-content">
          <h1>Explore Our Popular Packages</h1>
          <p>Discover the best travel experiences curated just for you</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="packages-controls">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by destination or package name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-tabs">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <p>Showing {filteredPackages.length} packages</p>
        <div className="view-options">
          <button className="view-option active">
            <i className="fas fa-grid"></i> Grid
          </button>
          <button className="view-option">
            <i className="fas fa-list"></i> List
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      {loading ? (
        <div className="loading-spinner">Loading packages...</div>
      ) : (
        <PackageGrid packages={filteredPackages} />
      )}
    </div>
  );
};

export default PopularTours;