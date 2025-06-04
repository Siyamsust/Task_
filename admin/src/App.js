// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import TourMonitoring from './components/TourMonitoring/TourMonitoring';
import AdminSupport from './components/AdminSupport/AdminSupport';
import DestinationSearch from './components/DestinationSearch/DestinationSearch';
import Reports from './components/Reports/Reports';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          
          <div className="main-content">
            <Routes>
            <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/tour-monitoring" element={<TourMonitoring />} />
              <Route path="/destination-search" element={<DestinationSearch />} />
              <Route path="/admin-support" element={<AdminSupport />} />
              <Route path="/reports" element={<Reports />} />
              
              <Route path="/signup" element={<Signup />} />
              <Route path="/boikalake" element={<h2>Welcome to the Admin Dashboard</h2>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;