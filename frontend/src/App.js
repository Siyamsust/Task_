import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './Pages/LoginSignup';
import Search from './Components/Search/Search';
import ProfilePage from './Pages/ProfilePage';
import TourDetails from './Components/TourDetails/TourDetails';
import { ToursProvider } from './Context/ToursContext'; // Import the ToursProvider

function App() {
  return (
    <ToursProvider> {/* Wrap everything that needs access to ToursContext */}
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/login' element={<LoginSignup />} />
            <Route path='/' element={<Search />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path="/tourDetails/:tourId" element={<TourDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ToursProvider>
  );
}

export default App;
