import React from "react";
import { useNavigate } from "react-router-dom";
import "./PackageInfo.css";

const PackageInfo = ({ tour, companyId }) => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate(`/chat`, {
      state: {
        chatType: "companies",
        companyId: companyId,
      },
    });
  };

  return (
    <div className="package-info">
      {/* Package Title Section */}


      <div className="package-content">
        {/* Left Column */}
          <h1>{tour.name}</h1>
          <p className="package-categories">{tour.packageCategories.join(", ")}</p>
        <div className="content-column">
          <div className="info-section">
            <h2>Tour Overview</h2>
            <div className="overview-details">
              <div className="detail-item">
                <span className="label">Duration</span>
                <p>{tour.duration.days} days, {tour.duration.nights} nights</p>
              </div>
              <div className="detail-item">
                <span className="label">Group Size</span>
                <p>Maximum {tour.maxGroupSize} people</p>
              </div>
              <div className="detail-item">
                <span className="label">Price</span>
                <p>${tour.price} per person</p>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h2>Special Notes</h2>
            <p className="special-note">{tour.specialNote || "No special notes available."}</p>
          </div>

          <div className="info-section">
            <h2>What's Included</h2>
            <ul className="includes-list">
              {tour.includes.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-column">
          <div className="info-section">
            <h2>Destinations</h2>
            <div className="destinations-list">
              {tour.destinations.map((destination, index) => (
                <div key={index} className="destination-item">
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <span className="duration">{destination.stayDuration}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="company-section">
            <div className="company-details">
              <img src={tour.companyLogo} alt={tour.companyName} />
              <div>
                <h3>{tour.companyName}</h3>
                <button onClick={handleChatClick}>
                  <i className="fas fa-comments"></i> Chat with Company
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageInfo;