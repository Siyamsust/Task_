import React, { useState } from 'react';
import HeroSection from '../../Components/HeroSection/HeroSection';
import SearchFilters from '../../Components/SearchFilters/SearchFilters';
import PopularTours from '../../Components/PopularTours/PopularTours';
import Categories from '../../Components/Categories/Categories';
import WeatherRecommended from '../../Components/WeatherRecommended/WeatherRecommended';
import TrendingDestinations from '../../Components/TrendingDestinations/TrendingDestinations';
import Footer from '../../Components/Footer/Footer';
import './Homepage.css';

const Homepage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <div className="homepage">
        <HeroSection onSearch={setSearchQuery} />
        
        <div className="main-content">
          

          <section id="popular-section" className="popular-section">
            <div className="section-header">
              <h2>Popular Tour Packages</h2>
              <div className="view-options">
                <button className={activeFilter === 'all' ? 'active' : ''} 
                        onClick={() => setActiveFilter('all')}>
                  All
                </button>
                <button className={activeFilter === 'trending' ? 'active' : ''} 
                        onClick={() => setActiveFilter('trending')}>
                  Trending
                </button>
                <button className={activeFilter === 'featured' ? 'active' : ''} 
                        onClick={() => setActiveFilter('featured')}>
                  Featured
                </button>
              </div>
            </div>
            <PopularTours filter={activeFilter} searchQuery={searchQuery} />
          </section>

          <section id="categories-section" className="categories-section">
            <h2>Explore by Categories</h2>
            <Categories />
          </section>

          <section className="weather-section">
            <h2>Weather based recommendations</h2>
            <WeatherRecommended />
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage; 