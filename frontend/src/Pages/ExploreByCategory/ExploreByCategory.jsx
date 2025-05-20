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
  console.log("Active Category:", activeCategory);
  console.log("All Tours:", tours);
  
  if (activeCategory === 'all') {
    setFilteredTours(tours);
  } else {
    // Add debugging logs to see the structure of packageCategories
    tours.forEach(tour => {
      console.log(`Tour "${tour.name}" categories:`, tour.packageCategories);
    });
    
    const filtered = tours.filter(tour => {
      console.log(`Checking tour: ${tour.name}`);
      console.log(`Categories for this tour:`, tour.packageCategories);
      
      // Check if packageCategories exists and has content
      if (!tour.packageCategories || tour.packageCategories.length === 0) {
        console.log("No categories found for this tour");
        return false;
      }
      
      // Try this simplified approach that handles multiple potential formats
      const matchFound = tour.packageCategories.some(cat => {
        let categoryValue = cat;
        
        // If it's a string that might be an array in string format
        if (typeof cat === 'string' && (cat.includes('[') || cat.includes(','))) {
          try {
            // Try to extract categories from various string formats
            const cleanedStr = cat.replace(/[$$$$']/g, '');
            const possibleCategories = cleanedStr.split(',').map(c => c.trim());
            console.log(`Parsed categories from string: ${possibleCategories}`);
            
            return possibleCategories.some(c => 
              c.toLowerCase() === activeCategory.toLowerCase()
            );
          } catch (e) {
            console.error("Error parsing category:", e);
            // Fall back to direct comparison
            return cat.toLowerCase() === activeCategory.toLowerCase();
          }
        } else {
          // Direct comparison for simple string
          return categoryValue.toLowerCase() === activeCategory.toLowerCase();
        }
      });
      
      console.log(`Match found for ${tour.name}: ${matchFound}`);
      return matchFound;
    });
    
    console.log("Filtered tours:", filtered);
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
