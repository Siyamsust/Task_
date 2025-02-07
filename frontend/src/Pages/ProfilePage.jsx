import React, { useState } from 'react';
import Preferences from '../Components/Preferences/Preferences';
import MyBookings from '../Components/MyBookings/MyBookings';
import SavedTours from '../Components/SavedTours/SavedTours';
import Avatar from '../Components/Avatar/Avatar';
import './CSS/ProfilePage.css'
function ProfilePage() {
  const [selectedComponent, setSelectedComponent] = useState('Avatar');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Avatar':
        return <Avatar />;
      case 'Preferences':
        return <Preferences />;
      case 'MyBookings':
        return <MyBookings />;
      case 'SavedTours':
        return <SavedTours />;
      default:
        return <Avatar />;
    }
  };

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      <div className="menu">
        <ul>
          <li onClick={() => setSelectedComponent('Avatar')}>Avatar</li>
          <li onClick={() => setSelectedComponent('Preferences')}>Preferences</li>
          <li onClick={() => setSelectedComponent('MyBookings')}>My Bookings</li>
          <li onClick={() => setSelectedComponent('SavedTours')}>Saved Tours</li>
        </ul>
      </div>
      <div className="profile-container">{renderComponent()}</div>
    </div>
  );
}

export default ProfilePage;
