import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/tour-approval">Tour Approval</Link>
        </li>
        <li>
          <Link to="/user-management">User & Company Management</Link>
        </li>
        <li>
          <Link to="/destination-search">Destination Search</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
