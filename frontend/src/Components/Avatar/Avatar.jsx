import React, { useState } from 'react';
import './Avatar.css';
import profile2 from '../../Assets/profile2.jpg'
function Avatar() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [contact, setContact] = useState('123-456-7890');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSave = () => {
    // Save logic here (e.g., API call)
    alert('Profile Updated!');
  };

  return (
    <div className="avatar-card">
      {/* Avatar Section */}
      <div className="avatar-section">
        <img src={image?image : profile2} alt="Avatar" className="avatar-image" />
        <p>Name:</p>
        <p>Email:</p>
        <p>Phone:</p>
        <input type="file" onChange={handleAvatarChange} />
        
      </div>

      {/* User Details Section */}
      <div className="user-details">
        <h3>Update Profle</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="tel"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact Number"
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default Avatar;
