import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './settings.css';

const Settings = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notificationSettings: {
      emailNotifications: true,
      chatNotifications: true,
      systemNotifications: true
    }
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [name]: checked
      }
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: 'Password updated successfully' });
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating password' });
    }
  };

  const handleNotificationSettings = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/admin/update-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData.notificationSettings)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: 'Notification settings updated successfully' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update notification settings' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating notification settings' });
    }
  };

  return (
    <div className="settings-container">
      <h2>Admin Settings</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="settings-section">
        <h3>Account Settings</h3>
        <form onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Update Password
          </button>
        </form>
      </div>

      <div className="settings-section">
        <h3>Notification Settings</h3>
        <form onSubmit={handleNotificationSettings}>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.notificationSettings.emailNotifications}
                onChange={handleNotificationChange}
              />
              Email Notifications
            </label>
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="chatNotifications"
                checked={formData.notificationSettings.chatNotifications}
                onChange={handleNotificationChange}
              />
              Chat Notifications
            </label>
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="systemNotifications"
                checked={formData.notificationSettings.systemNotifications}
                onChange={handleNotificationChange}
              />
              System Notifications
            </label>
          </div>

          <button type="submit" className="btn-primary">
            Save Notification Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
