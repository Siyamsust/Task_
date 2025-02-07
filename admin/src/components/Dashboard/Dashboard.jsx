import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="analytics">
        <div className="card">
          <h3>Bookings</h3>
          <p>1000 bookings</p>
        </div>
        <div className="card">
          <h3>Approvals</h3>
          <p>250 pending approvals</p>
        </div>
        <div className="card">
          <h3>Earnings</h3>
          <p>$50,000</p>
        </div>
      </div>
      <div className="notifications">
        <h3>Pending Approvals</h3>
        <ul>
          <li>Tour 1 - Pending</li>
          <li>Tour 2 - Pending</li>
          <li>Tour 3 - Pending</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
