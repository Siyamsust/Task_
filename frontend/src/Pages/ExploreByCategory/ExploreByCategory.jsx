import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToursContext } from '../../Context/ToursContext';
import CategoryTabs from '../../Components/CategoryTabs/CategoryTabs';
import './ExploreByCategory.css';

const ExploreByCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { tours, loading, fetchTours } = useContext(ToursContext);
  
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [filteredTours, setFilteredTours] = useState([]);
 const handleExploreNow = async (tourId) => {
    try {
      await fetch(`http://localhost:4000/api/tours/${tourId}/increment-view`, {
        method: 'PATCH',
      });
      navigate(`/package/${tourId}`);
    } catch (error) {
      console.error('Failed to increment view count:', error);
      navigate(`/package/${tourId}`); // Navigate anyway
    }
  };

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
        <PackageGrid2 packages={filteredTours} onExplore={handleExploreNow} />
      )}
    </div>
  );
};

export default ExploreByCategory;
// PackageGrid.jsx
const TourCard = ({ tour, onExplore }) => {
  // Average rating fallback if you want to pass it as prop or compute here
  const averageRating = tour.averageRating ?? tour.popularity?.rating?.average ?? 0;

  // Convert packageCategories array or string into display string
  let categoriesDisplay = 'General';
  if (Array.isArray(tour.packageCategories)) {
    categoriesDisplay = tour.packageCategories.join(', ');
  } else if (typeof tour.packageCategories === 'string') {
    categoriesDisplay = tour.packageCategories;
  }

  return (
    <div className="tour-card">
      <div className="tour-image">
        <img
          src={tour.images && tour.images.length > 0 ? `http://localhost:4000/${tour.images[0]}` : 'https://picsum.photos/300/200'}
          alt={tour.name}
          onError={(e) => { e.target.src = 'https://picsum.photos/300/200'; }}
        />
      </div>
      <div className="tour-info">
        <h3>{tour.name || 'Untitled Tour'}</h3>
        <div className="tour-details">
          <span>
            Price: <strong>${tour.price ?? 'N/A'}</strong>
          </span>
          <span>
            <i className="fas fa-tag"></i> {categoriesDisplay}
          </span>
          <span>
            <i className="fas fa-star"></i>{' '}
            {averageRating ? `${averageRating.toFixed(1)} / 5` : 'No Rating'}
          </span>
        </div>
        <div className="tour-actions">
          <button onClick={() => onExplore && onExplore(tour._id)} className="view-details-btn">
            Explore Now <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const PackageGrid2 = ({ packages, onExplore }) => {
  return (
    <div className="tour-row">
      {packages.length === 0 && <p className="no-tours-message">No tours found.</p>}
      {packages.map(tour => (
        <TourCard key={tour._id} tour={tour} onExplore={onExplore} />
      ))}
    </div>
  );
};



