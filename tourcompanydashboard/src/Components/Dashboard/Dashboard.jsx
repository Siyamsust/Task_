import React from 'react';
import { FaUsers, FaSuitcase, FaMoneyBillWave, FaStar, FaChartLine, FaCalendarCheck } from 'react-icons/fa';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Dummy data for demonstration
  const stats = {
    activePackages: 24,
    totalIncome: 45800,
    newBookings: 18,
    customerRating: 4.8,
    totalCustomers: 156,
    completedTours: 12
  };

  const popularPackages = [
    { id: 1, name: 'Sundarban Adventure', bookings: 45, rating: 4.9, revenue: 12500 },
    { id: 2, name: 'Cox\'s Bazar Deluxe', bookings: 38, rating: 4.7, revenue: 9800 },
    { id: 3, name: 'Bandarban Trek', bookings: 32, rating: 4.8, revenue: 8600 }
  ];

  const recentFeedback = [
    { id: 1, user: 'John Doe', package: 'Sundarban Adventure', rating: 5, comment: 'Amazing experience! The guide was very knowledgeable.' },
    { id: 2, user: 'Sarah Smith', package: 'Cox\'s Bazar Deluxe', rating: 4, comment: 'Great service but the hotel could be better.' },
    { id: 3, user: 'Mike Johnson', package: 'Bandarban Trek', rating: 5, comment: 'Unforgettable journey! Will definitely come back.' }
  ];

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  const monthlyRevenue = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 35000, 28000, 32000, 45800, 38000, 42000],
      backgroundColor: '#3498db',
      borderColor: '#2980b9',
      borderWidth: 1
    }]
  };

  const packageRevenue = {
    labels: popularPackages.map(pkg => pkg.name),
    datasets: [{
      data: popularPackages.map(pkg => pkg.revenue),
      backgroundColor: ['#2ecc71', '#e74c3c', '#f1c40f'],
      borderColor: ['#27ae60', '#c0392b', '#f39c12'],
      borderWidth: 1
    }]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue Overview'
      }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Package Revenue Distribution'
      }
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaSuitcase />
          </div>
          <div className="stat-details">
            <h3>Active Packages</h3>
            <p>{stats.activePackages}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon money">
            <FaMoneyBillWave />
          </div>
          <div className="stat-details">
            <h3>Monthly Revenue</h3>
            <p>${stats.totalIncome.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bookings">
            <FaCalendarCheck />
          </div>
          <div className="stat-details">
            <h3>New Bookings</h3>
            <p>{stats.newBookings}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon rating">
            <FaStar />
          </div>
          <div className="stat-details">
            <h3>Average Rating</h3>
            <p>{stats.customerRating}/5.0</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon customers">
            <FaUsers />
          </div>
          <div className="stat-details">
            <h3>Total Customers</h3>
            <p>{stats.totalCustomers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <FaChartLine />
          </div>
          <div className="stat-details">
            <h3>Completed Tours</h3>
            <p>{stats.completedTours}</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="dashboard-card">
          <Bar data={monthlyRevenue} options={barOptions} />
        </div>
        <div className="dashboard-card">
          <Pie data={packageRevenue} options={pieOptions} />
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card popular-packages">
          <h2>Popular Packages</h2>
          <div className="package-list">
            {popularPackages.map(pkg => (
              <div key={pkg.id} className="package-item">
                <div className="package-info">
                  <h3>{pkg.name}</h3>
                  <p>Bookings: {pkg.bookings}</p>
                  <p>Rating: {pkg.rating}/5.0</p>
                  <p>Revenue: ${pkg.revenue.toLocaleString()}</p>
                </div>
                <div className="package-chart">
                  <div className="chart-bar" style={{ height: `${(pkg.bookings/45)*100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card recent-feedback">
          <h2>Recent Feedback</h2>
          <div className="feedback-list">
            {recentFeedback.map(feedback => (
              <div key={feedback.id} className="feedback-item">
                <div className="feedback-header">
                  <h3>{feedback.user}</h3>
                  <div className="feedback-rating">
                    {renderStars(feedback.rating)}
                  </div>
                </div>
                <p className="feedback-package">{feedback.package}</p>
                <p className="feedback-comment">{feedback.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
