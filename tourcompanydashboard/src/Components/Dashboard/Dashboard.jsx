import React, { useEffect, useState } from 'react';
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
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/dashboard/stats`);
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        } else {
          setError(data.message || 'Failed to fetch stats');
        }
      } catch (err) {
        setError('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.round(rating));
  };

  if (loading) return <div className="dashboard"><h2>Loading dashboard...</h2></div>;
  if (error) return <div className="dashboard"><h2>Error: {error}</h2></div>;
  if (!stats) return null;

  // Prepare chart data
  const monthlyRevenue = {
    labels: stats.monthlyRevenue.labels,
    datasets: [{
      label: 'Monthly Revenue',
      data: stats.monthlyRevenue.data,
      backgroundColor: '#3498db',
      borderColor: '#2980b9',
      borderWidth: 1
    }]
  };

  const packageRevenue = {
    labels: stats.popularPackages.map(pkg => pkg.name),
    datasets: [{
      data: stats.popularPackages.map(pkg => pkg.price * pkg.popularity.bookings),
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
            <p>${stats.monthlyRevenue.data.reduce((a, b) => a + b, 0).toLocaleString()}</p>
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
            {stats.popularPackages.map(pkg => (
              <div key={pkg._id} className="package-item">
                <div className="package-info">
                  <h3>{pkg.name}</h3>
                  <p>Bookings: {pkg.popularity.bookings}</p>
                  <p>Rating: {pkg.popularity.rating.average}/5.0</p>
                  <p>Revenue: ${(pkg.price * pkg.popularity.bookings).toLocaleString()}</p>
                </div>
                <div className="package-chart">
                  <div className="chart-bar" style={{ height: `${(pkg.popularity.bookings / stats.popularPackages[0].popularity.bookings) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="dashboard-card recent-feedback">
          <h2>Recent Feedback</h2>
          <div className="feedback-list">
            {stats.recentFeedback.map((feedback, idx) => (
              <div key={feedback._id || idx} className="feedback-item">
                <div className="feedback-header">
                  <h3>{feedback.name}</h3>
                  <div className="feedback-rating">
                    {renderStars(feedback.popularity?.rating?.average || 0)}
                  </div>
                </div>
                <p className="feedback-package">Ratings: {feedback.popularity?.rating?.count || 0}</p>
                <p className="feedback-comment">Average: {feedback.popularity?.rating?.average || 0}/5.0</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
