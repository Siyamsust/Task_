import React, { useState } from 'react';
import './TourMonitoring.css';

const TourMonitoring = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [tours, setTours] = useState([
    { 
      id: 1, 
      name: "Cox's Bazar Beach Tour", 
      status: 'ongoing',
      company: 'Travel Buddy Ltd',
      startDate: '2023-05-15',
      endDate: '2023-05-20',
      participants: 24,
      guide: 'Mohammad Rafiq',
      location: "Cox's Bazar, Bangladesh",
      lastUpdate: '2 hours ago'
    },
    { 
      id: 2, 
      name: 'Sundarbans Mangrove Forest Expedition', 
      status: 'upcoming',
      company: 'Green Tours',
      startDate: '2023-06-10',
      endDate: '2023-06-15',
      participants: 18,
      guide: 'Arif Hossain',
      location: 'Sundarbans, Bangladesh',
      lastUpdate: '1 day ago'
    },
    { 
      id: 3, 
      name: 'Sylhet Tea Gardens Tour', 
      status: 'completed',
      company: 'Explore Bangladesh',
      startDate: '2023-04-20',
      endDate: '2023-04-25',
      participants: 30,
      guide: 'Tania Akter',
      location: 'Sylhet, Bangladesh',
      lastUpdate: '5 days ago'
    },
    { 
      id: 4, 
      name: 'Rangamati Lake Adventure', 
      status: 'cancelled',
      company: 'Adventure Tours',
      startDate: '2023-05-05',
      endDate: '2023-05-10',
      participants: 15,
      guide: 'Kamal Ahmed',
      location: 'Rangamati, Bangladesh',
      lastUpdate: '3 days ago'
    },
    { 
      id: 5, 
      name: 'Saint Martin Island Tour', 
      status: 'ongoing',
      company: 'Island Explorers',
      startDate: '2023-05-12',
      endDate: '2023-05-17',
      participants: 22,
      guide: 'Sabina Akter',
      location: 'Saint Martin, Bangladesh',
      lastUpdate: '5 hours ago'
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setTours(tours.map((tour) => (tour.id === id ? { ...tour, status: newStatus } : tour)));
  };

  const filteredTours = tours.filter(tour => {
    // Filter by tab
    if (activeTab !== 'all' && tour.status !== activeTab) return false;
    
    // Filter by search term
    if (searchTerm && !tour.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !tour.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !tour.company.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const getStatusClass = (status) => {
    switch(status) {
      case 'ongoing': return 'status-ongoing';
      case 'upcoming': return 'status-upcoming';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'ongoing': return <i className="fas fa-route"></i>;
      case 'upcoming': return <i className="fas fa-calendar-alt"></i>;
      case 'completed': return <i className="fas fa-check-circle"></i>;
      case 'cancelled': return <i className="fas fa-ban"></i>;
      default: return null;
    }
  };

  return (
    <div className="tour-monitoring">
      <div className="monitoring-header">
        <h2>Tour Monitoring</h2>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search tours by name, location or company..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </div>
      
      <div className="monitoring-tabs">
        <button 
          className={activeTab === 'all' ? 'active' : ''} 
          onClick={() => setActiveTab('all')}
        >
          All Tours
        </button>
        <button 
          className={activeTab === 'ongoing' ? 'active' : ''} 
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing
        </button>
        <button 
          className={activeTab === 'upcoming' ? 'active' : ''} 
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={activeTab === 'completed' ? 'active' : ''} 
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button 
          className={activeTab === 'cancelled' ? 'active' : ''} 
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
      </div>
      
      <div className="tours-count">
        <p>Showing {filteredTours.length} tours</p>
      </div>
      
      <div className="tours-list">
        {filteredTours.map((tour) => (
          <div key={tour.id} className="tour-card">
            <div className="tour-header">
              <h3>{tour.name}</h3>
              <div className={`tour-status ${getStatusClass(tour.status)}`}>
                {getStatusIcon(tour.status)} {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
              </div>
            </div>
            
            <div className="tour-details">
              <div className="detail-item">
                <i className="fas fa-building"></i>
                <span>{tour.company}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{tour.location}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-calendar"></i>
                <span>{tour.startDate} to {tour.endDate}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-users"></i>
                <span>{tour.participants} participants</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-user-tie"></i>
                <span>Guide: {tour.guide}</span>
              </div>
              <div className="detail-item">
                <i className="fas fa-clock"></i>
                <span>Last update: {tour.lastUpdate}</span>
              </div>
            </div>
            
            <div className="tour-actions">
              <button className="action-btn view-btn">
                <i className="fas fa-eye"></i> View Details
              </button>
              
              {tour.status === 'upcoming' && (
                <>
                  <button 
                    className="action-btn start-btn"
                    onClick={() => handleStatusChange(tour.id, 'ongoing')}
                  >
                    <i className="fas fa-play"></i> Start Tour
                  </button>
                  <button 
                    className="action-btn cancel-btn"
                    onClick={() => handleStatusChange(tour.id, 'cancelled')}
                  >
                    <i className="fas fa-times"></i> Cancel
                  </button>
                </>
              )}
              
              {tour.status === 'ongoing' && (
                <button 
                  className="action-btn complete-btn"
                  onClick={() => handleStatusChange(tour.id, 'completed')}
                >
                  <i className="fas fa-check"></i> Complete
                </button>
              )}
              
              {(tour.status === 'completed' || tour.status === 'cancelled') && (
                <button className="action-btn report-btn">
                  <i className="fas fa-file-alt"></i> View Report
                </button>
              )}
            </div>
          </div>
        ))}
        
        {filteredTours.length === 0 && (
          <div className="no-tours">
            <i className="fas fa-search"></i>
            <p>No tours found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourMonitoring;
