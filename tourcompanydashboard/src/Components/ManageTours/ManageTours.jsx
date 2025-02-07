import React, { useState, useEffect } from 'react';

const ManageTours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    // Simulate fetching tours data
    setTours([
      { id: 1, name: 'Paris Tour', status: 'approved' },
      { id: 2, name: 'Tokyo Tour', status: 'pending' }
    ]);
  }, []);

  const handleEdit = (id) => {
    // Redirect to the edit page or open a modal for editing
    console.log(`Edit tour with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Remove the tour from the list or delete via API
    setTours(tours.filter(tour => tour.id !== id));
  };

  return (
    <div className="manage-tours">
      <h1>Manage Tours</h1>
      <ul>
        {tours.map(tour => (
          <li key={tour.id}>
            {tour.name} - {tour.status}
            <button onClick={() => handleEdit(tour.id)}>Edit</button>
            <button onClick={() => handleDelete(tour.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTours;
