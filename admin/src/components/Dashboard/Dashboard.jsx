import React from 'react';
import './Dashboard.css';
import {useState,useEffect} from 'react';
import Pendingtours from './PendingTours';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DUMMY_COMPANIES = [
  {
    id: 'c1',
    name: 'TravelXpress',
    email: 'info@travelxpress.com',
    phone: '+1 234 567 890',
    address: '123 Main St, City',
    status: 'pending',
  },
  {
    id: 'c2',
    name: 'AdventurePro',
    email: 'contact@adventurepro.com',
    phone: '+1 987 654 321',
    address: '456 Elm St, City',
    status: 'pending',
  },
];


const Dashboard = () => {
   const [pendingtours,setPendingtours]=useState([]);
   const [tours, setTours] = useState([]);
   const [bookingsData, setBookingsData] = useState({ totalBookings: 0, totalRevenue: 0 });
   const [runningTrips, setRunningTrips] = useState(0);
   const [revenueByMonth, setRevenueByMonth] = useState(Array(12).fill(0));
   const [topCompanies, setTopCompanies] = useState([]);
   const [companyMap, setCompanyMap] = useState({});
   const [loadingCharts, setLoadingCharts] = useState(true);
   const [upcomingTrips, setUpcomingTrips] = useState(0);
   const [finishedTrips, setFinishedTrips] = useState(0);
   const [barLabels, setBarLabels] = useState(["Jan"]);

   useEffect(() => {
     async function fetchDashboardData() {
       // Fetch all tours
       const toursRes = await fetch('http://localhost:4000/api/tours');
       const toursData = await toursRes.json();
       const tours = toursData.tours || [];
       setTours(tours);
       // Fetch all bookings
       const bookingsRes = await fetch('http://localhost:4000/api/bookings/all');
       const bookingsData = await bookingsRes.json();
       const allBookings = bookingsData.bookings || [];
       // Calculate total revenue
       const totalRevenue = allBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0) * 0.1;
       setBookingsData((prev) => ({ ...prev, totalRevenue: Math.round(totalRevenue) }));
       // Calculate upcoming and finished trips
       const today = new Date();
       let upcoming = 0;
       let finished = 0;
       tours.forEach(tour => {
         if (tour.status !== 'approved' || !tour.startDate || !tour.endDate) return;
         const start = new Date(tour.startDate);
         const end = new Date(tour.endDate);
         if (start > today) upcoming++;
         if (end < today) finished++;
       });
       setUpcomingTrips(upcoming);
       setFinishedTrips(finished);
     }
     fetchDashboardData();
   }, []);

   useEffect(() => {
     async function fetchChartData() {
       setLoadingCharts(true);
       // Fetch all tours
       const toursRes = await fetch('http://localhost:4000/api/tours');
       const toursData = await toursRes.json();
       const tours = toursData.tours || [];
       // Map tourId to companyId
       const tourToCompany = {};
       tours.forEach(t => { if (t._id && t.companyId) tourToCompany[t._id] = t.companyId; });
       // Fetch all companies
       const companiesRes = await fetch('http://localhost:4000/api/companies');
       const companiesData = await companiesRes.json();
       const companies = companiesData.companies || [];
       const companyMap = {};
       companies.forEach(c => { companyMap[c._id] = c.name; });
       setCompanyMap(companyMap);
       // Fetch all bookings at once
       const bookingsRes = await fetch('http://localhost:4000/api/bookings/all');
       const bookingsData = await bookingsRes.json();
       const allBookings = bookingsData.bookings || [];
       // Bar chart: revenue by month (last up to 12 months)
       const now = new Date();
       const months = [];
       const monthlyRevenue = [];
       for (let i = 11; i >= 0; i--) {
         const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
         months.push(d);
         monthlyRevenue.push(0);
       }
       allBookings.forEach(b => {
         if (!b.createdAt || !b.totalAmount) return;
         const d = new Date(b.createdAt);
         for (let i = 0; i < months.length; i++) {
           const month = months[i];
           if (d.getFullYear() === month.getFullYear() && d.getMonth() === month.getMonth()) {
             monthlyRevenue[i] += b.totalAmount * 0.1;
           }
         }
       });
       // Remove leading months with zero revenue (but always show at least 1 month)
       let firstNonZero = monthlyRevenue.findIndex(v => v > 0);
       if (firstNonZero === -1) firstNonZero = monthlyRevenue.length - 1;
       const barLabels = months.slice(firstNonZero).map(m => m.toLocaleString('default', { month: 'short', year: '2-digit' }));
       const barData = monthlyRevenue.slice(firstNonZero);
       setRevenueByMonth(barData);
       setBarLabels(barLabels);
       // Pie chart: top 10 companies by revenue last month
       const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
       const nextMonth = new Date(now.getFullYear(), now.getMonth(), 1);
       const companyRevenue = {};
       allBookings.forEach(b => {
         if (!b.createdAt || !b.totalAmount) return;
         const d = new Date(b.createdAt);
         if (d >= lastMonth && d < nextMonth) {
           const companyId = tourToCompany[b.tourId];
           if (!companyId) return;
           companyRevenue[companyId] = (companyRevenue[companyId] || 0) + b.totalAmount * 0.1;
         }
       });
       const sortedCompanies = Object.entries(companyRevenue)
         .sort((a, b) => b[1] - a[1])
         .slice(0, 10)
         .map(([companyId, revenue]) => ({
           companyId,
           name: companyMap[companyId] || 'Unknown',
           revenue
         }));
       setTopCompanies(sortedCompanies);
       setLoadingCharts(false);
     }
     fetchChartData();
   }, []);


  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div className="date-time">
          <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
      
      <div className="analytics-overview">
        <div className="card primary-card">
          <div className="card-icon">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="card-content">
            <h3>Active Packages</h3>
            <p className="card-value">{upcomingTrips}</p>
            <p className="card-trend positive">
              <i className="fas fa-arrow-up"></i>
            </p>
          </div>
        </div>
        
        <div className="card success-card">
          <div className="card-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="card-content">
            <h3>Running Trips</h3>
            <p className="card-value">{runningTrips}</p>
            <p className="card-trend negative">
              <i className="fas fa-arrow-down"></i>
            </p>
          </div>
        </div>
        
        <div className="card info-card">
          <div className="card-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="card-content">
            <h3>Total Revenue</h3>
            <p className="card-value">${bookingsData.totalRevenue?.toLocaleString() || 0}</p>
            <p className="card-trend positive">
              <i className="fas fa-arrow-up"></i>
            </p>
          </div>
        </div>
        
        <div className="card warning-card">
          <div className="card-icon">
            <i className="fas fa-flag-checkered"></i>
          </div>
          <div className="card-content">
            <h3>Finished Trips</h3>
            <p className="card-value">{finishedTrips}</p>
            <p className="card-trend positive">
              <i className="fas fa-arrow-up"></i>
            </p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        {/* New Companies Section - Modern Card UI */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3><i className="fas fa-building"></i> New Companies</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="modern-card-list">
            {DUMMY_COMPANIES.map(company => (
              <div key={company.id} className="modern-card company-modern-card">
                <div className="modern-card-avatar">
                  <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${company.name}`} alt={company.name} />
                </div>
                <div className="modern-card-info">
                  <h4>{company.name}</h4>
                  <p className="modern-card-email">{company.email}</p>
                  <p className="modern-card-phone">{company.phone}</p>
                  <p className="modern-card-address">{company.address}</p>
                </div>
                <div className="modern-card-actions">
                  <button className="modern-btn view">View Details</button>
                  <button className="modern-btn approve">Approve</button>
                  <button className="modern-btn reject">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Revenue Bar Chart Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3><i className="fas fa-chart-bar"></i> Revenue Earned (Last 12 Months)</h3>
          </div>
          {loadingCharts ? <p>Loading chart...</p> :
            <Bar
              data={{
                labels: barLabels,
                datasets: [
                  {
                    label: 'Revenue (USD)',
                    data: revenueByMonth,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }}
            />
          }
        </div>
        {/* Top Companies Pie Chart Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3><i className="fas fa-chart-pie"></i> Top 10 Companies by Revenue (Last Month)</h3>
          </div>
          {loadingCharts ? <p>Loading chart...</p> :
            <Pie
              data={{
                labels: topCompanies.map(c => c.name),
                datasets: [
                  {
                    data: topCompanies.map(c => c.revenue),
                    backgroundColor: [
                      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                      '#FF9F40', '#C9CBCF', '#FF6384AA', '#36A2EBAA', '#FFCE56AA'
                    ],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'right' },
                  title: { display: false },
                },
              }}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
