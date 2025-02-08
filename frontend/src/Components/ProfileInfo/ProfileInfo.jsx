import React from 'react';
import './ProfileInfo.css';

const ProfileInfo = ({ user }) => {
  return (
    <div className="profile-info">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={user?.avatar || 'default-avatar.png'} alt="Profile" />
          <button className="edit-avatar">
            <i className="fas fa-camera"></i>
          </button>
        </div>
        <h2>{user?.name || 'User Name'}</h2>
        <p>{user?.email || 'email@example.com'}</p>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">12</span>
          <span className="stat-label">Total Trips</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">5</span>
          <span className="stat-label">Wishlist</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">8</span>
          <span className="stat-label">Reviews</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo; 