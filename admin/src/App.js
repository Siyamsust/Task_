import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';  // Import the Navbar component
import Dashboard from './components/Dashboard/Dashboard';
import TourMonitoring from './components/TourMonitoring/TourMonitoring';
//import UserManagement from './components/UserManagement/UserManagement';
import AdminSupport from './components/AdminSupport/AdminSupport';
import DestinationSearch from './components/DestinationSearch/DestinationSearch';
import Reports from './components/Reports/Reports';
//import Settings from './components/Settings/Settings';
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
            <Route path="/tour-monitoring" element={<TourMonitoring />} />
            {/* <Route path="/user-management" element={<UserManagement />} /> */}
            <Route path="/destination-search" element={<DestinationSearch />} />
            <Route path="/admin-support" element={<AdminSupport />} />
            {/* Default Route */}
            <Route path="/" element={<h2>Welcome to the Admin Dashboard</h2>} />
            <Route path="/reports" element={<Reports />} />
            {/* <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
