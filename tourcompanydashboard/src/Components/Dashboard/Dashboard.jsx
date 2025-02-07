import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [bookings, setBookings] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setBookings(120); // Example: Number of bookings
    setEarnings(8500); // Example: Earnings in USD
    setNotifications([
      { id: 1, message: "New booking request for Tour A" },
      { id: 2, message: "Tour B approved by admin" }
    ]);
    setAnalytics([
      { destination: "Paris", count: 45 },
      { destination: "Tokyo", count: 35 }
    ]);
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="overview">
        <div>Bookings: {bookings}</div>
        <div>Earnings: ${earnings}</div>
      </div>
      <div className="notifications">
        <h2>Notifications</h2>
        {notifications.map(notification => (
          <div key={notification.id}>{notification.message}</div>
        ))}
      </div>
      <div className="analytics">
        <h2>Analytics</h2>
        {analytics.map((item, index) => (
          <div key={index}>{item.destination}: {item.count} bookings</div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
