import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const handleLogOut = ()=>{
    logout();
    navigate('/Login')
  }
  return (
    <nav className="navbar">
      <div className="logo-container">
        <h1 className="logo">Admin Panel</h1>
      </div>
      
      <ul className="nav-links">
        <li>
          <Link to="/">
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
          <Link to="/admin/companies">
            <i className="fas fa-check-circle"></i>
            <span>Companies</span>
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
          <Link className="logout-btn" onClick={handleLogOut}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
