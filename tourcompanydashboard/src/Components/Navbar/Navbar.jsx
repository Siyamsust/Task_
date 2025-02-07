import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // For styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/dashboard" className="navbar-item">Dashboard</Link></li>
        <li><Link to="/upload-tour" className="navbar-item">Upload Tour</Link></li>
        <li><Link to="/manage-tours" className="navbar-item">Manage Tours</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
