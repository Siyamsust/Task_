import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Icon } from '@iconify/react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <h1 className="logo">Admin Panel</h1>
      </div>
      
      <ul className="nav-links">
        <li>
          <Link to="/dashboard">
            <i className="fas fa-chart-line"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/tour-monitoring">
            <i className="fas fa-check-circle"></i>
            <span>Tour Monitoring</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-support">
            <i className="fas fa-headset"></i>
            <span>Admin Support</span>
          </Link>
        </li>
        
        <li>
          <Link to="/settings">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </Link>
        </li>
     
        <li className="user-profile">
          <Icon icon="mdi:account" height={30}/>
          <span>Admin User</span>
          <Link to="/logout" className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </Link>
        </li>
        <div className="weather-info">
          <Icon icon="mdi:sun" />
          <span>19°C Haze</span>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
