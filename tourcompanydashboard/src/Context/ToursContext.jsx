import React, { createContext, useContext, useState, useEffect } from 'react';

const ToursContext = createContext(null); // Initialize with null

export const ToursProvider = ({ children }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/tours');
      const data = await response.json();
      
      if (data.success) {
        setTours(data.tours);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTour = async (tourId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/tours/${tourId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.success) {
        setTours(tours.filter(tour => tour._id !== tourId));
        return { success: true };
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error('Error deleting tour:', err);
      return { success: false, error: err.message };
    }
  };

  const updateTourStatus = async (tourId, status) => {
    try {
      const response = await fetch(`http://localhost:4000/api/tours/${tourId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      
      if (data.success) {
        setTours(tours.map(tour => 
          tour._id === tourId ? { ...tour, status: status } : tour
        ));
        return { success: true };
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error('Error updating tour status:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const value = {
    tours,
    loading,
    error,
    fetchTours,
    deleteTour,
    updateTourStatus
  };

  return (
    <ToursContext.Provider value={value}>
      {children}
    </ToursContext.Provider>
  );
};

export const useTours = () => {
  const context = useContext(ToursContext);
  if (context === null) {
    throw new Error('useTours must be used within a ToursProvider');
  }
  return context;
};

export default ToursContext; 