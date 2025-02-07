import React, { createContext, useState, useEffect } from 'react';

// Create the context
const ToursContext = createContext();

// Provider component
const ToursProvider = ({ children }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tours data
    const fetchTours = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/tours');
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        setTours(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <ToursContext.Provider value={{ tours, loading, error }}>
      {children}
    </ToursContext.Provider>
  );
};
export { ToursContext, ToursProvider };

