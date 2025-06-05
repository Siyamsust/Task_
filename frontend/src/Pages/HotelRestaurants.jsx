import React, { useEffect, useState } from 'react';
import axios from 'axios';
import tourPlaces from '../data/tourPlaces';
import './HotelRestaurants.css'; // optional CSS file for styling

const HotelRestaurants = () => {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [hotelRes, restaurantRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/hotels`, {
          params: { location }
        }),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/restaurants`, {
          params: { location }
        })
      ]);
      setHotels(hotelRes.data || []);
      setRestaurants(restaurantRes.data || []);
    } catch (err) {
      console.error('❌ Error fetching places:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <div className="places-container">
      <h2>🏨 Nearby Hotels</h2>

      <div className="filters">
        <label htmlFor="location">Filter by Location:</label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All</option>
          {tourPlaces.map((place, index) => (
            <option key={index} value={place}>{place}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div className="card-grid">
            {hotels.map((hotel, i) => (
              <div key={i} className="place-card">
                <img src={hotel.image} alt={hotel.name} />
                <h3>{hotel.name}</h3>
                <p>📍 {hotel.location}</p>
                <p>⭐ {hotel.rating || 'N/A'}</p>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: '40px' }}>🍽️ Nearby Restaurants</h2>
          <div className="card-grid">
            {restaurants.map((restaurant, i) => (
              <div key={i} className="place-card">
                <img src={restaurant.image} alt={restaurant.name} />
                <h3>{restaurant.name}</h3>
                <p>📍 {restaurant.location}</p>
                <p>⭐ {restaurant.rating || 'N/A'}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HotelRestaurants;
