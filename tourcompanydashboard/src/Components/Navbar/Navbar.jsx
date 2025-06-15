import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaSuitcase,
  FaUpload,
  FaChartBar,
  FaEnvelope,
  FaIdCard,
  FaUserCircle,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaCheckCircle
} from 'react-icons/fa';
import socket from '../../socket'
import { useAuth } from '../../Context/AuthContext';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { company, logout } = useAuth();
  const [companyDetails, setCompanyDetails] = useState(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Fetch company details
  useEffect(() => {
    if (company && company.company) {
      setCompanyDetails(company.company);
      console.log("Company details updated:", company.company);
    }
  }, [company]);

  useEffect(() => {
    if (socket) {
      socket.on('veri', (data) => {
        console.log('Verification update received:', data);
        if (data.action === 'done' && data.company) {
          setCompanyDetails(prev => ({
            ...prev,
            isVerified: data.company.isVerified,
            verificationStatus: data.company.verificationStatus
          }));
        }
      });
    }
  }, [socket]); // Dependency array includes 'socket' to re-run if socket changes

  const notifications = [
    { id: 1, text: 'New booking request', time: '5 min ago' },
    { id: 2, text: 'Tour package approved', time: '1 hour ago' },
    { id: 3, text: 'New customer review', time: '2 hours ago' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>
          {companyDetails?.name}
          {companyDetails?.isVerified && (
            <FaCheckCircle className="verified-icon" title="Verified Company" />
          )}
        </h1>
      </div>

      <div className="navbar-links">
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
          <FaHome /> <span>Dashboard</span>
        </Link>
        <Link to="/manage-tours" className={location.pathname === '/manage-tours' ? 'active' : ''}>
          <FaSuitcase /> <span>Manage Tours</span>
        </Link>
        <Link to="/bookings" className={location.pathname === '/bookings' ? 'active' : ''}>
          <FaSuitcase /> <span>Tour & Bookings</span>
        </Link>
        <Link to="/upload-tour" className={location.pathname === '/upload-tour' ? 'active' : ''}>
          <FaUpload /> <span>Upload Tour</span>
        </Link>
        <Link to="/chat" className={location.pathname === '/chat' ? 'active' : ''}>
          <FaEnvelope /> <span>Messages</span>
        </Link>
        <Link to="/license" className={location.pathname === '/license' ? 'active' : ''}>
          <FaIdCard /> <span>License</span>
        </Link>
      </div>

      <div className="navbar-actions">
        {/* <div ref={notificationRef} className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
          <FaBell />
          <span className="notification-badge">3</span>
          {showNotifications && (
            <div className="notifications-dropdown">
              <h3>Notifications</h3>
              {notifications.map(notification => (
                <div key={notification.id} className="notification-item">
                  <p>{notification.text}</p>
                  <span>{notification.time}</span>
                </div>
              ))}
            </div>
          )}
        </div> */}

        <div ref={profileRef} className="profile-menu" onClick={() => setShowProfile(!showProfile)}>
          <FaUserCircle />
          {showProfile && (
            <div className="profile-dropdown">
              {/* <Link to="/profile">
                <FaUserCircle /> Profile
              </Link>
              <Link to="/settings">
                <FaCog /> Settings
              </Link> */}
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
