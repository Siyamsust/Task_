import React from 'react';
import './Dashboard.css';
import {useState,useEffect} from 'react';
import Pendingtours from './PendingTours';
const Dashboard = () => {
   const [pendingtours,setPendingtours]=useState([]);
   useEffect(()=>{
    fetch('http://localhost:4000/api/pendingtours')
    .then((res) => res.json())
    .then(data => {
      console.log('Fetched data:', data);
      setPendingtours(data?.tours || []);
    })
    .catch(error => {
      console.error('Error fetching pending tours:', error);
      setPendingtours([]);
    });
   },[])
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
            <h3>Total Bookings</h3>
            <p className="card-value">1,000</p>
            <p className="card-trend positive">
              <i className="fas fa-arrow-up"></i> 12% from last month
            </p>
          </div>
        </div>
        
        <div className="card success-card">
          <div className="card-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="card-content">
            <h3>Pending Approvals</h3>
            <p className="card-value">250</p>
            <p className="card-trend negative">
              <i className="fas fa-arrow-down"></i> 5% from last week
            </p>
          </div>
        </div>
        
        <div className="card info-card">
          <div className="card-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="card-content">
            <h3>Total Revenue</h3>
            <p className="card-value">$50,000</p>
            <p className="card-trend positive">
              <i className="fas fa-arrow-up"></i> 8% from last month
            </p>
          </div>
        </div>
        
        <div className="card warning-card">
          <div className="card-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="card-content">
            <h3>New Users</h3>
            <p className="card-value">120</p>
            <p className="card-trend positive">
              <i className="fas fa-arrow-up"></i> 15% from last month
            </p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h3><i className="fas fa-bell"></i> Pending Approvals</h3>
            <button className="view-all-btn">View All</button>
          </div>
<<<<<<< HEAD
          <div className="approval-list"> 
            {Array.isArray(pendingtours) && pendingtours.map((tour) => (
              <Pendingtours 
                id={tour._id}
                name={tour.name}
                applicant={tour.applicant}
                date={new Date(tour.createdAt).toLocaleDateString()}
                status={tour.status}
                price={tour.price}
              />
            ))}
=======
          <div className="approval-list">
            <div className="approval-item">
              <div className="approval-info">
                <h4>Cox's Bazar Beach Tour</h4>
                <p>Applicant: Mohammad Rafiq</p>
                <p className="approval-date">May 15, 2023</p>
              </div>
              <div className="approval-actions">
                <button className="approve-btn"><i className="fas fa-check"></i> Approve</button>
                <button className="reject-btn"><i className="fas fa-times"></i> Reject</button>
              </div>
            </div>
            
            <div className="approval-item">
              <div className="approval-info">
                <h4>Sylhet Tour Package</h4>
                <p>Applicant: Tania Akter</p>
                <p className="approval-date">May 14, 2023</p>
              </div>
              <div className="approval-actions">
                <button className="approve-btn"><i className="fas fa-check"></i> Approve</button>
                <button className="reject-btn"><i className="fas fa-times"></i> Reject</button>
              </div>
            </div>
            
            <div className="approval-item">
              <div className="approval-info">
                <h4>Sundarbans Adventure</h4>
                <p>Applicant: Arif Hossain</p>
                <p className="approval-date">May 12, 2023</p>
              </div>
              <div className="approval-actions">
                <button className="approve-btn"><i className="fas fa-check"></i> Approve</button>
                <button className="reject-btn"><i className="fas fa-times"></i> Reject</button>
              </div>
            </div>
>>>>>>> bf4b7caf545fe676ac173dfecd8cbfa91c947455
          </div>
        </div>
        
        <div className="dashboard-section">
          <div className="section-header">
            <h3><i className="fas fa-chart-line"></i> Recent Activities</h3>
            <div className="time-filter">
              <button className="active">Today</button>
              <button>Week</button>
              <button>Month</button>
            </div>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon success">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="activity-content">
                <h4>Tour Approved</h4>
                <p>Cox's Bazar Beach Tour has been approved</p>
                <p className="activity-time">1 hour ago</p>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon warning">
                <i className="fas fa-user-plus"></i>
              </div>
              <div className="activity-content">
                <h4>New User</h4>
                <p>Sabina Akter has registered</p>
                <p className="activity-time">3 hours ago</p>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon info">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <div className="activity-content">
                <h4>New Payment</h4>
                <p>$15,000 payment received</p>
                <p className="activity-time">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
