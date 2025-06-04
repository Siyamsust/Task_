import React, { useState, useContext, useMemo } from 'react';
import { ToursContext } from '../../Context/ToursContext';
import PackageGrid from '../../Components/PackageGrid/PackageGrid';
import './PopularTours.css';

const PopularTours = () => {
  const { tours = [], loading } = useContext(ToursContext);
  const [searchQuery, setSearchQuery] = useState('');

  // Helper function to check if tour is completed
  const isTourCompleted = (startDate) => {
    if (!startDate) return false;
    const now = new Date();
    const tourStartDate = new Date(startDate);
    return tourStartDate < now;
  };

  // 🔢 Calculate popularity score and sort
  const sortedAndFilteredTours = useMemo(() => {
    // Step 1: Compute popularity score
    const scoredTours = tours.map(tour => {
      const {
        bookings = 0,
        views = 0,
        wishlistCount = 0,
        rating = {}
      } = tour.popularity || {};

      const averageRating = rating.average || 0;

      const popularityScore =
        bookings * 0.5 +
        averageRating * 10 * 0.2 +
        views * 0.2 +
        wishlistCount * 0.1;

      // Add completed status to tour object
      const isCompleted = isTourCompleted(tour.startDate);

      return { ...tour, popularityScore, isCompleted };
    });

    // Step 2: Filter by search
    const searchedTours = scoredTours.filter(tour => {
      const name = tour.name || '';
      const location = tour.location || '';
      return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Step 3: Sort by popularity score descending
    return searchedTours.sort((a, b) => b.popularityScore - a.popularityScore);
  }, [tours, searchQuery]);

  return (
    <div className="popular-packages-container">
      {/* Header Section */}
      <div className="popular-packages-header">
        <div className="popular-packages-header-content">
          <h1>Explore Our Popular Packages</h1>
          <p>Discover the best travel experiences curated just for you</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="popular-packages-controls">
        <div className="popular-search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by destination or package name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Results Summary */}
      <div className="popular-results-summary">
        <p>Showing {sortedAndFilteredTours.length} packages</p>
      </div>

      {/* Packages Grid */}
      <div className='popular-packages-grid'>
        {loading ? (
          <div className="popular-loading-spinner">Loading packages...</div>
        ) : (
          <PackageGrid packages={sortedAndFilteredTours} />
        )}
      </div>
    </div>
  );
};

export default PopularTours;