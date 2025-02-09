import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact-section">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We help you discover and book amazing travel experiences across the globe.</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/packages">Tour Packages</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/chat">Customer Support</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            <li><i className="fas fa-phone"></i> +1 234 567 8900</li>
            <li><i className="fas fa-envelope"></i> info@task.com</li>
            <li><i className="fas fa-map-marker-alt"></i> 123 Travel Street, City</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Task. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 