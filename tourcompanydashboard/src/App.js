import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToursProvider } from './Context/ToursContext';
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/Navbar/Navbar'; 
import UploadTour from './Components/UploadTour/UploadTour';
import ManageTours from './Components/ManageTours/ManageTours';

import EditTour from './Components/EditTour/EditTour';
// Import the Navbar component

const App = () => {
  return (
    <ToursProvider>
      <Router>
        <div className="app">
          <Navbar /> {/* Render the Navbar */}
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload-tour" element={<UploadTour />} />
              <Route path="/manage-tours" element={<ManageTours />} />
              <Route path="/edit-tour/:tourId" element={<EditTour />} />


            </Routes>
          </div>
        </div>
      </Router>
    </ToursProvider>
  );
};

export default App;
