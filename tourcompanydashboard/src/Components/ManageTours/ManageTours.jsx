import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTours } from '../../Context/ToursContext';
import './ManageTours.css';

const ManageTours = () => {
  const { tours: allTours, loading, error, deleteTour, updateTourStatus, fetchcompanyTours } = useTours();
  const [filteredTours, setFilteredTours] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTourType, setActiveTourType] = useState('all');
  const [filterLoading, setFilterLoading] = useState(false);
  const navigate = useNavigate();

  const packageCategories = [
    'Adventure',
    'Cultural',
    'Nature & Eco',
    'Family',
    'Honeymoon',
    'Educational',
    'Seasonal'
  ];

  useEffect(() => {
    fetchcompanyTours();
  }, []);

  // Combined filtering effect
  useEffect(() => {
    let filtered = [...allTours];

    // First filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tour => {
        let categories = tour.packageCategories;

        if (Array.isArray(categories) && categories.length > 0) {
          let categoryString = categories[0];

          try {
            // Parse categories based on format
            if (categoryString.startsWith('[')) {
              categories = JSON.parse(categoryString);
            } else {
              categories = categoryString
                .replace('[', '')
                .replace(']', '')
                .split(',')
                .map(cat => cat.trim());
            }

            // Case-insensitive comparison
            return categories.some(cat =>
              cat.toLowerCase() === activeCategory.toLowerCase()
            );
          } catch (error) {
            console.error("Error parsing categories for tour:", tour.name, error);
            return false;
          }
        }
        return false;
      });
    }

    // Then filter by tour type
    if (activeTourType !== 'all') {
      filtered = filtered.filter(tour => tour.tourType?.[activeTourType]);
    }
     // Then filter by tour type
     if (activeTourType !== 'all') {
      filtered = filtered.filter(tour => 
        tour.tourType && tour.tourType[activeTourType] === true
      );
    }

    setFilteredTours(filtered);
  }, [activeCategory, activeTourType, allTours]);


  // const fetchFilteredTours = async (category, tourType) => {
  //   try {
  //     setFilterLoading(true);
  //     console.log('Fetching with filters:', { category, tourType });

  //     let queryParams = new URLSearchParams();

  //     if (category && category !== 'all') {
  //       queryParams.append('category', category);
  //     }

  //     if (tourType && tourType !== 'all') {
  //       queryParams.append('tourType', tourType);
  //     }

  //     const url = `http://localhost:4000/api/tours/filter?${queryParams}`;
  //     console.log('Request URL:', url);

  //     const response = await fetch(url);
  //     const data = await response.json();

  //     if (!response.ok) {
  //       console.error('Server response:', data);
  //       throw new Error(data.details || data.error || 'Failed to fetch filtered tours');
  //     }

  //     if (data.success) {
  //       console.log('Received data:', data);
  //       console.log('Query used:', data.query);
  //       console.log('Tours found:', data.tours.length);
  //       setFilteredTours(data.tours);
  //     } else {
  //       throw new Error(data.error || 'Failed to fetch filtered tours');
  //     }
  //   } catch (err) {
  //     console.error('Error fetching filtered tours:', err);
  //     setFilteredTours([]);
  //     // Optional: Show error to user
  //     alert(`Error: ${err.message}`);
  //   } finally {
  //     setFilterLoading(false);
  //   }
  // };
  // const filterTours = (category, tourType) => {
  //   let filtered = [...allTours];

  //   // Filter by category
  //   if (category !== 'all') {
  //     if (category === 'custom') {
  //       filtered = filtered.filter(tour => tour.customCategory);
  //     } else {
  //       filtered = filtered.filter(tour => 
  //         tour.packageCategories?.some(cat => 
  //           cat.toLowerCase() === category.toLowerCase()
  //         )
  //       );
  //     }
  //   }

  //   // Filter by tour type
  //   if (tourType !== 'all') {
  //     filtered = filtered.filter(tour => tour.tourType?.[tourType]);
  //   }

  //   setFilteredTours(filtered);
  // };
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // filterTours(category, activeTourType);
  };

  const handleTourTypeChange = (tourType) => {
    setActiveTourType(tourType);
    //  filterTours(activeCategory, tourType);
  };

  const handleEdit = (tourId) => {
    navigate(`/edit-tour/${tourId}`);
  };

  const handleDelete = async (tourId) => {
    if (window.confirm('Are you sure you want to delete this tour package?')) {
      const result = await deleteTour(tourId);
      if (!result.success) {
        alert(result.error || 'Failed to delete tour');
      }
    }
  };

  const handleStatusUpdate = async (tourId, status) => {
    const result = await updateTourStatus(tourId, status);
    if (!result.success) {
      alert(result.error || 'Failed to update status');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (err) {
      return 'Invalid Date';
    }
  };

  const getDuration = (tour) => {
    if (!tour?.duration) return 'N/A';
    const days = tour.duration.days || 0;
    const nights = tour.duration.nights || 0;
    return `${days}D/${nights}N`;
  };

  const fallbackImageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII=';

  if (loading) return <div className="loading">Loading tours...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="manage-tours">
      <div className="manage-tours-header">
        <h1>Manage Tour Packages</h1>

        <div className="filters">
          <div className="category-filters">
            <button
              className={activeCategory === 'all' ? 'active' : ''}
              onClick={() => handleCategoryChange('all')}
              disabled={filterLoading}
            >
              All Categories
            </button>
            {packageCategories.map(category => (
              <button
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => handleCategoryChange(category)}
                disabled={filterLoading}
              >
                {category}
              </button>
            ))}
            <button
              className={activeCategory === 'custom' ? 'active' : ''}
              onClick={() => handleCategoryChange('custom')}
              disabled={filterLoading}
            >
              Custom
            </button>
          </div>

          <div className="type-filters">
            <button
              className={activeTourType === 'all' ? 'active' : ''}
              onClick={() => handleTourTypeChange('all')}
              disabled={filterLoading}
            >
              All Types
            </button>
            <button
              className={activeTourType === 'single' ? 'active' : ''}
              onClick={() => handleTourTypeChange('single')}
              disabled={filterLoading}
            >
              Single
            </button>
            <button
              className={activeTourType === 'group' ? 'active' : ''}
              onClick={() => handleTourTypeChange('group')}
              disabled={filterLoading}
            >
              Group
            </button>
          </div>
        </div>
      </div>

      {filterLoading ? (
        <div className="loading">Filtering tours...</div>
      ) : (
        <>
          <div className="tours-grid">
            {filteredTours.map(tour => (
              <div key={tour._id} className="tour-card">
                <div className="tour-image">
                  {tour.images && tour.images[0] ? (
                    <img
                      src={`http://localhost:4000/${tour.images[0]}`}
                      alt={tour.name}
                      onError={(e) => {
                        e.target.src = fallbackImageUrl;
                      }}
                    />
                  ) : (
                    <img
                      src={fallbackImageUrl}
                      alt="No image available"
                    />
                  )}
                  <span className={`status ${tour.status || 'draft'}`}>
                    {tour.status || 'draft'}
                  </span>
                </div>

                <div className="tour-details">
                  <h3>{tour.name || 'Untitled Tour'}</h3>
                  <div className="tour-info">
                    <div className="categories-list">
                      {tour.packageCategories?.map((category, index) => (
                        <span key={index} className="category-tag">
                          {category}
                          {index < tour.packageCategories.length - 1 ? ' ' : ''}
                        </span>
                      ))}
                      {tour.customCategory && (
                        <span className="category-tag custom">
                          {tour.customCategory}
                        </span>
                      )}
                    </div>
                    <div className="tour-type-tags">
                      {tour.tourType?.single && <span className="type-tag">Single</span>}
                      {tour.tourType?.group && <span className="type-tag">Group</span>}
                    </div>
                    <p><strong>Duration:</strong> {getDuration(tour)}</p>
                    <p><strong>Price:</strong> ${tour.price || 'N/A'}</p>
                    {tour.tourType.group && (
                      <p>
                        <strong>Available Seats:</strong> {' '}
                        {tour.availableSeats !== undefined ?
                          `${tour.availableSeats}/${tour.maxGroupSize || 'N/A'}` :
                          'N/A'}
                      </p>
                    )}
                  </div>

                  <div className="tour-dates">
                    {tour.startDate && (
                      <p>
                        <strong>Dates:</strong> {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
                      </p>
                    )}
                  </div>

                  <div className="tour-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(tour._id)}
                    >
                      Edit
                    </button>
                    {(!tour.status || tour.status !== 'approved') && (
                      <button
                        className="approve-btn"
                        onClick={() => handleStatusUpdate(tour._id, 'pending')}
                        disabled={tour.status === 'pending'}
                      >
                        {tour.status === 'pending' ? 'Pending' : 'Send for Approval'}
                      </button>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(tour._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTours.length === 0 && !filterLoading && (
            <div className="no-tours">
              No tours found for this category
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageTours;
