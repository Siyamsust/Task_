import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Homepage from './Pages/Homepage/Homepage';
import PackageDetails from './Pages/PackageDetails/PackageDetails';
import LoginSignup from './Pages/LoginSignup/LoginSignup';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import { ToursProvider } from './Context/ToursContext';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ToursProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/package/:id" element={<PackageDetails />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
        </BrowserRouter>
      </ToursProvider>
    </AuthProvider>
  );
}

export default App;
