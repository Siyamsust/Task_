import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <i className="fas fa-globe-americas"></i>
          Task
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item">
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/destinations" className="nav-item">
            <i className="fas fa-map-marker-alt"></i> Destinations
          </Link>
          <div className="nav-item">
            <i className="fas fa-umbrella-beach"></i> Categories
          </div>
          <Link to="/packages" className="nav-item">
            <i className="fas fa-suitcase"></i> Packages
          </Link>
        </div>

        <div className="nav-auth">
          {user ? (
            <>
              <Link to="/profile" className="profile-btn">
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </Link>
          )}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 