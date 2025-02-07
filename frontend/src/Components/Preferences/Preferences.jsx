import React, { useState } from 'react';
import './Preferences.css'
function Preferences() {
  const [favorites, setFavorites] = useState(['Paris', 'New York', 'Tokyo']);
  const [interest, setInterest] = useState('Adventure');

  const handleAddDestination = () => {
    setFavorites([...favorites, 'New Destination']);
  };

  return (
    <div className="preferences">
      <h3>Travel Preferences</h3>
      <div className="favorites">
        <h4>Favorite Destinations</h4>
        <ul>
          {favorites.map((dest, index) => (
            <li key={index}>{dest}</li>
          ))}
        </ul>
        <button onClick={handleAddDestination}>Add Destination</button>
      </div>
      <div className="travel-interest">
        <h4>Travel Interest</h4>
        <input
          type="text"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder="Travel Interest"
        />
      </div>
    </div>
  );
}

export default Preferences;
