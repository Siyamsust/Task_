import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="settings">
      <div className="settings-section">
        <h3>Personal Information</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      </div>

      <div className="settings-section">
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>
          <button type="submit" className="save-btn">Update Password</button>
        </form>
      </div>

      <div className="settings-section">
        <h3>Preferences</h3>
        <div className="preferences">
          <div className="preference-item">
            <label className="toggle">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <div className="preference-text">
              <span>Email Notifications</span>
              <p>Receive updates about your trips and offers</p>
            </div>
          </div>
          <div className="preference-item">
            <label className="toggle">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <div className="preference-text">
              <span>SMS Notifications</span>
              <p>Get important updates via SMS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 