import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PackageGrid.css';

const PackageGrid = ({packages}) => {
  const navigate = useNavigate();
  
  // Helper functions
  const getDestinations = (destinations) => {
    if (!destinations || destinations.length === 0) return 'Various destinations';
    return destinations.map(dest => dest.name).join(', ');
  };
  
  const getTourType = (tourType) => {
    if (!tourType) return 'Standard Tour';
    if (tourType.single && tourType.group) return 'Single & Group';
    if (tourType.single) return 'Single Tour';
    if (tourType.group) return 'Group Tour';
    return 'Standard Tour';
  };
  
  const formatMeals = (meals) => {
    if (!meals) return 'No meals included';
    const included = [];
    if (meals.breakfast) included.push('Breakfast');
    if (meals.lunch) included.push('Lunch');
    if (meals.dinner) included.push('Dinner');
    return included.length > 0 ? included.join(', ') : 'No meals included';
  };
  
  if (packages.length === 0) {
    return (
      <div className="package-grid-empty">
        <i className="fas fa-search"></i>
        <p>No packages found for this category.</p>
        <p>Please try a different category or check back later.</p>
      </div>
    );
  }
  
  return (
    <div className="package-grid">
      {packages.map(pkg => (
        <div key={pkg._id} className="package-card">
          <div className="package-image">
            <img 
              src={`http://localhost:4000/${pkg.images[0]}`} 
              alt={pkg.name} 
              loading="lazy"
            />
            <div className="package-price">From ${pkg.price}</div>
            
            {pkg.availableSeats !== undefined && pkg.availableSeats < 5 && pkg.availableSeats > 0 && (
              <div className="limited-seats">Only {pkg.availableSeats} seats left!</div>
            )}
            
            {pkg.tourGuide && (
              <div className="tour-guide-badge">
                <i className="fas fa-user-tie"></i> Guide Included
              </div>
            )}
          </div>
          
          <div className="package-content">
            <h3 className="package-title">{pkg.name}</h3>
            
            <div className="package-info">
              <span className="info-item">
                <i className="fas fa-map-marker-alt"></i> 
                {getDestinations(pkg.destinations)}
              </span>
              <span className="info-item">
                <i className="fas fa-clock"></i> 
                {pkg.duration.days}d/{pkg.duration.nights}n
              </span>
              <span className="info-item">
                <i className="fas fa-users"></i> 
                {getTourType(pkg.tourType)}
              </span>
            </div>
            
            <div className="package-details">
              {/* {pkg.transportation && (
                <div className="detail-item">
                  <i className="fas fa-car"></i> 
                  <span>{pkg.transportation.type}</span>
                </div>
              )} */}
              
              {/* <div className="detail-item">
                <i className="fas fa-utensils"></i> 
                <span>{formatMeals(pkg.meals)}</span>
              </div> */}
              
              {/* {pkg.startDate && pkg.endDate && (
                <div className="detail-item">
                  <i className="fas fa-calendar-alt"></i>
                  <span>
                    {new Date(pkg.startDate).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short'
                    })} - {new Date(pkg.endDate).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )} */}
            </div>
            
            <div className="package-footer">
              {pkg.rating && (
                <div className="rating">
                  <i className="fas fa-star"></i>
                  <span>{pkg.rating}</span>
                </div>
              )}
              
              <button 
                className="view-details"
                onClick={() => navigate(`/package/${pkg._id}`)}
                aria-label={`View details for ${pkg.name}`}
              >
                View Details <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackageGrid;