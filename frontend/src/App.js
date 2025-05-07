import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Homepage from './Pages/Homepage/Homepage';
import PackageDetails from './Pages/PackageDetails/PackageDetails';
import LoginSignup from './Pages/LoginSignup/LoginSignup';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import ChatPage from './Pages/ChatPage/ChatPage';
import { ToursProvider } from './Context/ToursContext';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import TermsAndConditions from './Pages/TermsandConditions/TermsandConditions';
import Faq from './Pages/Faq/Faq';

import ExploreByCategory from './Pages/ExploreByCategory/ExploreByCategory';
import SearchFilter from './Pages/SearchFilter/SearchFilter';
import PopularTours from './Pages/PopularTours/PopularTours';
import Checkout from './Pages/Checkout/Checkout';
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
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/populartours" element={<PopularTours />} />
                  <Route 
                    path="/profile" 
                    element={
                      <PrivateRoute>
                        <ProfilePage />
                      </PrivateRoute>
                    } 
                  />
                  <Route path="/search" element={<SearchFilter />} />
                  <Route path="/explore/:category?" element={<ExploreByCategory />} />
                  <Route path="/checkout/:tourId" element={<Checkout />} />
                  <Route path="/terms" element={<TermsAndConditions />} />
                  <Route path="/terms/:section" element={<TermsAndConditions />} />
                  <Route path="/faq" element={<Faq />} />
                </Routes>
              </div>
            </BrowserRouter>
          </ToursProvider>
    </AuthProvider>
  );
}

export default App;
