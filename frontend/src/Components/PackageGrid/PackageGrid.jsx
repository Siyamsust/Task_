import React ,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './PackageGrid.css';
const PackageGrid = ({packages}) => {
  const navigate = useNavigate();
  if (packages.length === 0) {
    return (
      <div className="package-grid-empty">
        No packages found.
      </div>
    );
  }
  return (
    <div className="package-grid">
      {packages.map(pkg => (
        <div key={pkg._id} className="package-card">
          <div className="package-image">
            <img src={`http://localhost:4000/${pkg.images[0]}`} alt={pkg.name} />
            <div className="package-price">From ${pkg.price}</div>
          </div>
          <div className="package-content">
            <h3>{pkg.name}</h3>
            <div className="package-info">
              <span><i className="fas fa-map-marker-alt"></i> {pkg.location}</span>
              <span><i className="fas fa-clock"></i> {pkg.duration.days} Days</span>
            </div>
            <div className="package-footer">
              <div className="rating">
                <i className="fas fa-star"></i>
                <span>{pkg.rating}</span>
              </div>
              <button 
                className="view-details"
                onClick={() => navigate(`/package/${pkg._id}`)}
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