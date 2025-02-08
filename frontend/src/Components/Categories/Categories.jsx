import React from 'react';
import './Categories.css';

const Categories = () => {
  const categories = [
    { id: 1, name: 'Adventure', icon: 'mountain', color: '#f97316' },
    { id: 2, name: 'Beach', icon: 'umbrella-beach', color: '#0ea5e9' },
    { id: 3, name: 'Cultural', icon: 'landmark', color: '#8b5cf6' },
    { id: 4, name: 'City Tours', icon: 'city', color: '#ec4899' },
    { id: 5, name: 'Nature', icon: 'leaf', color: '#22c55e' },
    { id: 6, name: 'Food Tours', icon: 'utensils', color: '#f43f5e' }
  ];

  return (
    <div className="categories-container">
      {categories.map(category => (
        <div 
          key={category.id} 
          className="category-card"
          style={{ '--category-color': category.color }}
        >
          <div className="category-icon">
            <i className={`fas fa-${category.icon}`}></i>
          </div>
          <h3>{category.name}</h3>
          <span className="tour-count">15 Tours</span>
        </div>
      ))}
    </div>
  );
};

export default Categories; 