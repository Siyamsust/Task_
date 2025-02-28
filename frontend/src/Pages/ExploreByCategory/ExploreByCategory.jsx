import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToursContext } from '../../Context/ToursContext';
import CategoryTabs from '../../Components/CategoryTabs/CategoryTabs';
import PackageGrid from '../../Components/PackageGrid/PackageGrid';
import './ExploreByCategory.css';

const ExploreByCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { tours, loading, fetchTours } = useContext(ToursContext);
  
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [filteredTours, setFilteredTours] = useState([]);

  // Fetch tours when component mounts
  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  // Update active category when URL changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredTours(tours);
    } else {
      const filtered = tours.filter(tour => {
        let categories = tour.packageCategories;
  
        // First, get the actual array from the outer array
        if (Array.isArray(categories) && categories.length > 0) {
          // Take the first element and parse it if it's a string
          let categoryString = categories[0];
          
          try {
            // If it's in JSON format (with square brackets and quotes)
            if (categoryString.startsWith('[')) {
              categories = JSON.parse(categoryString);
            } else {
              // If it's in the format [Cultural,Nature & Eco,Family]
              categories = categoryString
                .replace('[', '')
                .replace(']', '')
                .split(',')
                .map(cat => cat.trim());
            }
            
            // Case-insensitive comparison
            return categories.some(cat => 
              cat.toLowerCase() === activeCategory.toLowerCase()
            );
          } catch (error) {
            console.error("Error parsing categories for tour:", tour.name, error);
            return false;
          }
        }
        return false;
      });
  
      setFilteredTours(filtered);
    }
  }, [activeCategory, tours]);

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setActiveCategory(newCategory);
    navigate(`/explore/${newCategory}`); // Update the URL
  };

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1>Explore Tours</h1>
        <p>Discover amazing tours and activities by category</p>
      </div>

      <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <PackageGrid packages={filteredTours} />
      )}
    </div>
  );
};

export default ExploreByCategory;
