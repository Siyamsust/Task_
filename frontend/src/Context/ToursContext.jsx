import React, { createContext, useState, useEffect } from 'react';

export const ToursContext = createContext();

export const ToursProvider = ({ children }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/tours');
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }
      const data = await response.json();
      setTours(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setTours([]);
    }
  };

  return (
    <ToursContext.Provider value={{ tours, loading, error, fetchTours }}>
      {children}
    </ToursContext.Provider>
  );
}; 