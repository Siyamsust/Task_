import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';  // Import the Navbar component
import Dashboard from './components/Dashboard/Dashboard';
import TourApproval from './components/TourApproval/TourApproval';
import UserManagement from './components/UserManagement/UserManagement';
import DestinationSearch from './components/DestinationSearch/DestinationSearch';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Include the Navbar */}
        <Navbar />
        
        {/* Route Configuration */}
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tour-approval" element={<TourApproval />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/destination-search" element={<DestinationSearch />} />
            {/* Default Route */}
            <Route path="/" element={<h2>Welcome to the Admin Dashboard</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
