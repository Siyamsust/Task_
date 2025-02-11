import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PackageInfo.css';

const PackageInfo = ({ tour, companyId }) => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate(`/chat`, {
      state: {
        chatType: 'companies',
        companyId: companyId
      }
    });
  };

  return (
    <div className="package-info">
      <div className="package-header">
        <h1>{tour.name}</h1>
        <div className="meta-info">
          <span><i className="fas fa-clock"></i> {tour.duration.days}</span>
          <span><i className="fas fa-star"></i> {tour.rating}</span>
        </div>
      </div>

      <p className="description">{tour.description}</p>

      <div className="company-info">
        <div className="company-details">
          <img src={tour.companyLogo} alt={tour.companyName} />
          <div>
            <h3>{tour.companyName}</h3>
          </div>
        </div>
        <button className="chat-btn" onClick={handleChatClick}>
          <i className="fas fa-comments"></i> Chat with Company
        </button>
      </div>

      <div className="included-section">
        <h2>What's Included</h2>
        <ul>
          {(tour.included || []).map((item, index) => (
            <li key={index}>
              <i className="fas fa-check"></i>
              {item}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default PackageInfo; 