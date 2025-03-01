import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import './Settings.css';

const Settings = () => {
  const { user, updateUser, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Initialize form data with user data
  useEffect(() => {
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const updatedData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      await updateUser(updatedData);
      setMessage({ type: 'success', text: 'Personal information updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update personal information.' });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match!' });
      return;
    }

    try {
      await updateUser({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      setMessage({ type: 'success', text: 'Password updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update password.' });
    }
  };

  return (
    <div className="settings">
      <div className="settings-section">
        <h3>Personal Information</h3>
        <form onSubmit={handlePersonalInfoSubmit}>
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
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div className="settings-section">
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordSubmit}>
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
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
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

      {/* Preferences section remains the same */}
    </div>
  );
};

export default Settings;