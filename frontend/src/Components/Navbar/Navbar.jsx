import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = '/#' + sectionId;
      return;
    }

    const section = document.getElementById(sectionId);
    const navbar = document.querySelector('.navbar');
    if (section && navbar) {
      const navbarHeight = navbar.offsetHeight;
      const sectionTop = sectionId === 'contact-section' 
        ? section.offsetTop
        : section.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
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
          <button 
            className="nav-item"
            onClick={() => navigate('/populartours')}
          >
            <i className="fas fa-fire"></i> Popular
          </button>
          <button 
            className="nav-item"
            onClick={() => navigate('/explore')}
          >
            <i className="fas fa-compass"></i> Explore
          </button>
          <button 
            className="nav-item"
             onClick={() => navigate('/review')}
          >
            <i className="fas fa-envelope"></i>Review
          </button>
        </div>

        <div className="nav-auth">
          {user ? (
            <>
              <Link to="/profile" className="profile-btn">
                <i className="fas fa-user"></i>
                <span>{user.user?.name || 'Profile'}</span>
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