import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../Assets/task.jpg";
import name from "../../Assets/name.jpg";
import profile from "../../Assets/profile.png";

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLoginClick = () => {
    if (isLoggedIn) {
      // Handle logout logic
      setIsLoggedIn(false);
    } else {
      // Redirect to the login page if not logged in
      navigate("/login");
    }
  };

  // Handle navigation to the profile page
  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img className="icon" src={logo} alt="TripAdvisor Logo" />
        <img className="name" src={name} alt="" />
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li><Link to="/">Explore</Link></li>
        <li><Link to="/">Explore</Link></li>
        <li><Link to="/">Explore</Link></li>
        <li><Link to="/">Explore</Link></li>
      </ul>

      {/* User Section */}
      <div className="navbar-user">
        <button className="navbar-button" onClick={handleLoginClick}>
          {isLoggedIn ? "LogOut" : "LogIn"}
        </button>
        <div className="navbar-profile" onClick={handleProfileClick}>
          <img src={profile} alt="Profile Icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
