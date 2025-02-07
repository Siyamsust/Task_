import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'User' },
    { id: 2, name: 'Jane Smith', role: 'Company' },
  ]);

  const handleDeactivate = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="user-management">
      <h2>User and Company Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>Role: {user.role}</p>
            <button onClick={() => handleDeactivate(user.id)}>Deactivate</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
