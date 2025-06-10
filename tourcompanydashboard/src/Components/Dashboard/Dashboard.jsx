import React, { useMemo } from 'react';
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
import { useTours } from '../../Context/ToursContext';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  const { tours, loading, error } = useTours();
  const { company } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!company) {
      navigate('/login');
    }
  }, [company, navigate]);

  // Compute stats from tours
  const stats = useMemo(() => {
    if (!tours || tours.length === 0) return null;
    const now = new Date();
    const activePackages = tours.filter(t => new Date(t.startDate) <= now && new Date(t.endDate) >= now).length;
    const completedTours = tours.filter(t => new Date(t.endDate) < now).length;
    // Gather all bookings for this company's tours
    let allBookings = [];
    let allCustomerEmails = new Set();
    let allRatings = [];
    tours.forEach(tour => {
      if (Array.isArray(tour.bookings)) {
        allBookings = allBookings.concat(tour.bookings);
        tour.bookings.forEach(b => {
          if (b.email) allCustomerEmails.add(b.email);
        });
      }
      if (tour.popularity?.rating?.average) {
        allRatings.push(tour.popularity.rating.average);
      }
    });
    // Lifetime revenue: sum of all bookings' totalAmount
    const lifetimeRevenue = allBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    // Average rating
    const customerRating = allRatings.length > 0 ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(2) : 'N/A';
    // New bookings: count of all bookings
    const newBookings = allBookings.length;
    // Bar chart: revenue for last 12 months
    const monthlyRevenueData = Array(12).fill(0);
    const monthlyLabels = [];
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(nowYear, nowMonth - i, 1);
      monthlyLabels.push(d.toLocaleString('default', { month: 'short', year: '2-digit' }));
    }
    allBookings.forEach(b => {
      if (!b.createdAt) return;
      const d = new Date(b.createdAt);
      // Find the index in the last 12 months
      const monthsAgo = (nowYear - d.getFullYear()) * 12 + (nowMonth - d.getMonth());
      if (monthsAgo >= 0 && monthsAgo < 12) {
        monthlyRevenueData[11 - monthsAgo] += b.totalAmount || 0;
      }
    });
    // Pie chart: revenue by package (for this company)
    const packageRevenue = tours.map(tour => {
      const revenue = Array.isArray(tour.bookings)
        ? tour.bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0)
        : 0;
      return { name: tour.name || tour.title || 'Untitled', revenue };
    });
    // Popular packages: top 3 by revenue
    const popularPackages = [...packageRevenue]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3);
    // Recent feedback: flatten all reviews
    const recentFeedback = tours.flatMap(t => t.reviews || []).slice(0, 5);
    return {
      activePackages,
      completedTours,
      newBookings,
      totalCustomers: allCustomerEmails.size,
      lifetimeRevenue,
      monthlyRevenue: { labels: monthlyLabels, data: monthlyRevenueData },
      packageRevenue,
      popularPackages,
      recentFeedback,
      customerRating
    };
  }, [tours]);

  if (loading) return <div className="dashboard"><h2>Loading dashboard...</h2></div>;
  if (error) return <div className="dashboard"><h2>Error: {error}</h2></div>;
  if (!stats) return <div className="dashboard"><h2>No data available.</h2></div>;

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

  const pieData = {
    labels: stats.packageRevenue.map(pkg => pkg.name),
    datasets: [{
      data: stats.packageRevenue.map(pkg => pkg.revenue),
      backgroundColor: ['#2ecc71', '#e74c3c', '#f1c40f', '#3498db', '#9b59b6', '#f39c12', '#1abc9c', '#e67e22', '#34495e', '#95a5a6'],
      borderColor: ['#27ae60', '#c0392b', '#f1c40f', '#2980b9', '#8e44ad', '#e67e22', '#16a085', '#d35400', '#2c3e50', '#7f8c8d'],
      borderWidth: 1
    }]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Package Revenue Distribution' }
    }
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Lifetime Revenue Overview' }
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
            <h3>Lifetime Revenue</h3>
            <p>${stats.lifetimeRevenue.toLocaleString()}</p>
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
          <Pie data={pieData} options={pieOptions} />
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
                  <p>Bookings: {pkg.popularity?.bookings || 0}</p>
                  <p>Rating: {pkg.popularity?.rating?.average || 'N/A'}/5.0</p>
                  <p>Revenue: ${(pkg.price * (pkg.popularity?.bookings || 0)).toLocaleString()}</p>
                </div>
                <div className="package-chart">
                  <div className="chart-bar" style={{ height: `${(pkg.popularity?.bookings || 0) / (stats.popularPackages[0]?.popularity?.bookings || 1) * 100}%` }}></div>
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
                    {'⭐'.repeat(Math.round(feedback.rating || 0))}
                  </div>
                </div>
                <p>{feedback.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
