import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTours } from '../../Context/ToursContext';
import './ManageTours.css';

const ManageTours = () => {
  const { tours, loading, error, deleteTour, updateTourStatus } = useTours();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTourType, setActiveTourType] = useState('all');
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

  const filterTours = () => {
    if (!Array.isArray(tours)) return [];

    return tours.filter(tour => {
      const categoryMatch =
        activeCategory === 'all' ||
        tour.packageCategories.includes(activeCategory) ||
        (activeCategory === 'custom' && tour.customCategory);

      const typeMatch =
        activeTourType === 'all' ||
        (activeTourType === 'single' && tour.tourType.single) ||
        (activeTourType === 'group' && tour.tourType.group);

      return categoryMatch && typeMatch;
    });
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
              onClick={() => setActiveCategory('all')}
            >
              All Categories
            </button>
            {packageCategories.map(category => (
              <button
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
            <button
              className={activeCategory === 'custom' ? 'active' : ''}
              onClick={() => setActiveCategory('custom')}
            >
              Custom
            </button>
          </div>

          <div className="type-filters">
            <button
              className={activeTourType === 'all' ? 'active' : ''}
              onClick={() => setActiveTourType('all')}
            >
              All Types
            </button>
            <button
              className={activeTourType === 'single' ? 'active' : ''}
              onClick={() => setActiveTourType('single')}
            >
              Single
            </button>
            <button
              className={activeTourType === 'group' ? 'active' : ''}
              onClick={() => setActiveTourType('group')}
            >
              Group
            </button>
          </div>
        </div>
      </div>

      <div className="tours-grid">
        {filterTours().map(tour => (
          <div key={tour._id} className="tour-card">
            <div className="tour-image">
              {tour.images && tour.images[0] ? (
                <img
                  src={`http://localhost:4000/${tour.images[0]}`}
                  alt={tour.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/300x200?text=No+Image"
                  alt="placeholder"
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
                  >
                    Send for Approval
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

      {filterTours().length === 0 && (
        <div className="no-tours">
          No tours found for this category
        </div>
      )}
    </div>
  );
};

export default ManageTours;
