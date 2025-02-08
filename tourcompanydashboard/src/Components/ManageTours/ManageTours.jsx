import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTours } from '../../Context/ToursContext';
import './ManageTours.css';

const ManageTours = () => {
  const { tours, loading, error, deleteTour, updateTourStatus } = useTours();
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const packageTypes = [
    'Single',
    'Group',
    'Couple (Honeymoon)',
    'Family',
    'Organizational'
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
    if (activeCategory === 'all') return tours;
    return tours.filter(tour => tour.packageType === activeCategory);
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
        <div className="category-filters">
          <button
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => setActiveCategory('all')}
          >
            All Packages
          </button>
          {packageTypes.map(type => (
            <button
              key={type}
              className={activeCategory === type ? 'active' : ''}
              onClick={() => setActiveCategory(type)}
            >
              {type}
            </button>
          ))}
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
                <p><strong>Type:</strong> {tour.packageType || 'N/A'}</p>
                <p><strong>Duration:</strong> {getDuration(tour)}</p>
                <p><strong>Price:</strong> ${tour.price || 'N/A'}</p>
                {tour.packageType === 'Group' && (
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
