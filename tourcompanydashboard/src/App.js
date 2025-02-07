import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/Navbar/Navbar'; 
import UploadTour from './Components/UploadTour/UploadTour';
import ManageTours from './Components/ManageTours/ManageTours';
// Import the Navbar component

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar /> {/* Render the Navbar */}
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload-tour" element={<UploadTour />} />
            <Route path="/manage-tours" element={<ManageTours />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
