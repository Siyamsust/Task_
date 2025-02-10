import React from 'react';
import './CategoryTabs.css';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'adventure', name: 'Adventure', icon: 'mountain', color: '#f97316' },
    { id: 'beach', name: 'Beach', icon: 'umbrella-beach', color: '#0ea5e9' },
    { id: 'cultural', name: 'Cultural', icon: 'landmark', color: '#8b5cf6' },
    { id: 'city', name: 'City Tours', icon: 'city', color: '#ec4899' },
    { id: 'nature', name: 'Nature', icon: 'leaf', color: '#22c55e' },
    { id: 'food', name: 'Food Tours', icon: 'utensils', color: '#f43f5e' }
  ];

  return (
    <div className="category-tabs">
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
          style={{ '--category-color': category.color }}
        >
          <i className={`fas fa-${category.icon}`}></i>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs; 