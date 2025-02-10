import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryTabs from '../../Components/CategoryTabs/CategoryTabs';
import PackageGrid from '../../Components/PackageGrid/PackageGrid';
import './ExploreByCategory.css';

const ExploreByCategory = () => {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackagesByCategory(activeCategory);
  }, [activeCategory]);

  const fetchPackagesByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/tours/category/${category}`);
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1>Explore Tours</h1>
        <p>Discover amazing tours and activities by category</p>
      </div>

      <CategoryTabs 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <PackageGrid packages={packages} />
      )}
    </div>
  );
};

export default ExploreByCategory; 