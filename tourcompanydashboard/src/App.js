import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToursProvider } from './Context/ToursContext';
import { AuthProvider } from './Context/AuthContext';
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/Navbar/Navbar'; 
import UploadTour from './Components/UploadTour/UploadTour';
import ManageTours from './Components/ManageTours/ManageTours';
import { useAuth } from './Context/AuthContext';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import EditTour from './Components/EditTour/EditTour';
import ChatPage from './Components/ChatPage/ChatPage';
// Import the Navbar component

const AppContent = () => {
  const {company, logout} = useAuth();
  console.log(company);

  return (
    <ToursProvider>
      {company ? (
        <div className="app">
          <Navbar /> {/* Render the Navbar */}
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload-tour" element={<UploadTour />} />
              <Route path="/chat" element={<ChatPage/>}/>
              <Route path="/manage-tours" element={<ManageTours />} />
              <Route path="/edit-tour/:tourId" element={<EditTour />} />
              <Route path="/login" element={<LoginSignup />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="app">
          <LoginSignup />
        </div>
      )}
    </ToursProvider>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
