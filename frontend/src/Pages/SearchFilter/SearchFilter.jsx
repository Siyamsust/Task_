import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToursContext } from '../../Context/ToursContext';
import './SearchFilter.css';
import SearchBox from '../../Components/SearchBox/SearchBox';
import { Star } from 'lucide-react';

const SearchFilter = () => {
  const { tours, loading, error } = useContext(ToursContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial filters from URL params
  const initialQuery = searchParams.get('query') || '';
  const initialPriceMax = parseInt(searchParams.get('priceMax') || '50000');
  const initialTourTypes = searchParams.getAll('tourType') || [];
  const initialDurations = searchParams.getAll('duration') || [];
  const initialSort = searchParams.get('sort') || 'lowest';

  // State for filters
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [priceRange, setPriceRange] = useState(initialPriceMax);
  const [selectedTourTypes, setSelectedTourTypes] = useState(initialTourTypes);
  const [selectedDurations, setSelectedDurations] = useState(initialDurations);
  const [sortOption, setSortOption] = useState(initialSort);
  const [filteredTours, setFilteredTours] = useState([]);

  // Tour type options
  const tourTypeOptions = [
    { id: 'adventure', label: 'Adventure' },
    { id: 'beach', label: 'Beach' },
    { id: 'mountain', label: 'Mountain' },
    { id: 'historical', label: 'Historical' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'wildlife', label: 'Wildlife' }
  ];

  // Duration options
  const durationOptions = [
    { id: '1-2', label: '1-2 Days' },
    { id: '3-5', label: '3-5 Days' },
    { id: '5+', label: '5+ Days' }
  ];

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
    updateURLParams('query', query);
  };

  // Handle price range change
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange(value);
    updateURLParams('priceMax', value.toString());
  };

  // Handle tour type checkbox
  const handleTourTypeChange = (type) => {
    setSelectedTourTypes(prev => {
      const updated = prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type];
      
      updateURLParams('tourType', updated, true);
      return updated;
    });
  };

  // Handle duration checkbox
  const handleDurationChange = (duration) => {
    setSelectedDurations(prev => {
      const updated = prev.includes(duration) 
        ? prev.filter(d => d !== duration) 
        : [...prev, duration];
      
      updateURLParams('duration', updated, true);
      return updated;
    });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    updateURLParams('sort', value);
  };

  // Update URL parameters
  const updateURLParams = (param, value, isArray = false) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (isArray) {
      // Clear existing values for this param
      newParams.delete(param);
      // Add each value as a separate param entry
      if (Array.isArray(value)) {
        value.forEach(v => {
          if (v) newParams.append(param, v);
        });
      }
    } else {
      if (value) {
        newParams.set(param, value);
      } else {
        newParams.delete(param);
      }
    }
    
    setSearchParams(newParams);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange(50000);
    setSelectedTourTypes([]);
    setSelectedDurations([]);
    setSortOption('lowest');
    setSearchParams({});
  };

  // Check duration based on days
  const matchesDuration = (tour, durations) => {
    if (durations.length === 0) return true;
    
    const totalDays = tour.duration.days;
    
    return durations.some(d => {
      if (d === '1-2') return totalDays >= 1 && totalDays <= 2;
      if (d === '3-5') return totalDays >= 3 && totalDays <= 5;
      if (d === '5+') return totalDays > 5;
      return false;
    });
  };

  // Filter and sort tours
  useEffect(() => {
    if (!tours.length) return;

    let result = [...tours];

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tour => 
        tour.name.toLowerCase().includes(query) || 
        (tour.destinations && tour.destinations.some(dest => 
          dest.name.toLowerCase().includes(query)
        ))
      );
    }

    // Apply price filter
    result = result.filter(tour => tour.price <= priceRange);

    // Apply tour type filter
    if (selectedTourTypes.length > 0) {
      result = result.filter(tour => {
        // Check if any of the tour's categories match selected types
        return tour.packageCategories.some(category => 
          selectedTourTypes.includes(category.toLowerCase())
        );
      });
    }

    // Apply duration filter
    if (selectedDurations.length > 0) {
      result = result.filter(tour => matchesDuration(tour, selectedDurations));
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'lowest':
          return a.price - b.price;
        case 'highest':
          return b.price - a.price;
        case 'duration':
          return b.duration.days - a.duration.days;
        default:
          return a.price - b.price;
      }
    });

    setFilteredTours(result);
  }, [tours, searchQuery, priceRange, selectedTourTypes, selectedDurations, sortOption]);

  // Generate star rating display
  const renderStars = (rating = 5) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i}
        size={16}
        fill={i < rating ? '#FFD700' : 'none'}
        stroke={i < rating ? '#FFD700' : '#666'}
      />
    ));
  };

  // Format price
  const formatPrice = (price) => {
    return '৳' + price.toLocaleString();
  };

  // Get the correct image URL
  const getImageUrl = (imagePath) => {
    // If it's already a full URL, return it
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, prepend the backend URL
    return `http://localhost:4000${imagePath}`;
  };

  return (
    <div className="container">
      <div className="search-container">
        <SearchBox onSearch={handleSearch} initialValue={searchQuery} />
      </div>
      
      <div className="main-content">
        {/* Filter Sidebar */}
        <aside className="filter-sidebar">
          <div className="filter-header">
            <h2>Filters</h2>
            <button className="reset-filters" onClick={resetFilters}>Reset</button>
          </div>

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
                onChange={handlePriceChange}
              />
              <div className="price-values">
                <span>৳0</span> - <span>৳{priceRange.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3>Tour Type</h3>
            <div className="filter-options">
              {tourTypeOptions.map(option => (
                <label key={option.id} className="filter-option">
                  <input 
                    type="checkbox"
                    checked={selectedTourTypes.includes(option.id)}
                    onChange={() => handleTourTypeChange(option.id)}
                  /> 
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Duration</h3>
            <div className="filter-options">
              {durationOptions.map(option => (
                <label key={option.id} className="filter-option">
                  <input 
                    type="checkbox"
                    checked={selectedDurations.includes(option.id)}
                    onChange={() => handleDurationChange(option.id)}
                  /> 
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Tour Results */}
        <main className="tour-results">
          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Loading tours...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>Error loading tours: {error}</p>
              <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
          ) : (
            <>
              <div className="results-header">
                <h2>{filteredTours.length} Tours Found</h2>
                <select 
                  className="sort-dropdown"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="lowest">Lowest Price</option>
                  <option value="highest">Highest Price</option>
                  <option value="duration">Longest Duration</option>
                </select>
              </div>

              {filteredTours.length === 0 ? (
                <div className="no-results">
                  <h3>No tours match your filters</h3>
                  <p>Try adjusting your search criteria or explore our popular tours.</p>
                  <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
                </div>
              ) : (
                <div className="tour-grid">
                  {filteredTours.map(tour => (
                    <Link to={`/tour/${tour._id}`} className="tour-card" key={tour._id}>
                      <img 
                        src={tour.images && tour.images.length > 0 
                          ? getImageUrl(tour.images[0]) 
                          : 'https://via.placeholder.com/300x200?text=No+Image'}
                        alt={tour.name} 
                        className="tour-image" 
                      />
                      {tour.tourGuide && (
                        <div className="tour-badge guide-badge">Tour Guide</div>
                      )}
                      {tour.availableSeats && tour.availableSeats < 5 && (
                        <div className="tour-badge seats-badge">Only {tour.availableSeats} seats left!</div>
                      )}
                      <div className="tour-details">
                        <h3 className="tour-title">{tour.name}</h3>
                        <p>{tour.duration.days} Days {tour.duration.nights} Nights</p>
                        <div className="destinations-preview">
                          {tour.destinations && tour.destinations.slice(0, 2).map((dest, index) => (
                            <span key={index}>{dest.name}{index < Math.min(1, tour.destinations.length - 1) ? ', ' : ''}</span>
                          ))}
                          {tour.destinations && tour.destinations.length > 2 && (
                            <span> + {tour.destinations.length - 2} more</span>
                          )}
                        </div>
                        <div className="tour-info">
                          <div className="rating">
                            {renderStars()}
                          </div>
                          <span className="tour-price">{formatPrice(tour.price)}</span>
                        </div>
                        <div className="tour-features">
                          {tour.meals.breakfast && <span className="feature"><i className="fas fa-utensils"></i> Breakfast</span>}
                          {tour.meals.dinner && <span className="feature"><i className="fas fa-moon"></i> Dinner</span>}
                          {tour.tourType.group && <span className="feature"><i className="fas fa-users"></i> Group</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchFilter;