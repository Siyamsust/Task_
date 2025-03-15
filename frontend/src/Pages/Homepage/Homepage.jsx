import React, { useState } from 'react';
import HeroSection from '../../Components/HeroSection/HeroSection';
import PopularTours from '../../Components/PopularTours/PopularTours';
import Categories from '../../Components/Categories/Categories';
import WeatherRecommended from '../../Components/WeatherRecommended/WeatherRecommended';
import Footer from '../../Components/Footer/Footer';
import './Homepage.css';

const Homepage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
<<<<<<< HEAD
    <div className="homepage">
      <HeroSection onSearch={setSearchQuery} />
      
     
        {/* Popular Tour Packages Section */}
        <div>
        <section className="content-section">
          <div className="section-header">
            <h2>Popular Tour Packages</h2>
            <p className="section-description">
              Discover our most loved destinations and experiences
            </p>
          </div>
          <div className="filter-buttons">
            {['all', 'trending', 'featured'].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)} Tours
              </button>
            ))}
          </div>
          <PopularTours filter={activeFilter} searchQuery={searchQuery} />
        </section>
        </div>

        {/* Explore by Categories Section */}
        <section className="content-section">
          <div className="section-header">
            <h2>Explore by Categories</h2>
            <p className="section-description">
              Find the perfect tour that matches your interests
            </p>
          </div>
          <Categories />
        </section>

        {/* Weather Based Recommendations Section */}
        <section className="content-section">
          <div className="section-header">
            <h2>Weather Based Recommendations</h2>
            <p className="section-description">
              Perfect destinations based on current weather conditions
            </p>
          </div>
          <WeatherRecommended />
        </section>
   
      
=======
    <>
      <div className="homepage">
        <HeroSection onSearch={setSearchQuery} />
        <section id="popular-section" className="popular-section">
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
>>>>>>> 6bd6df964cdc4880e588e3561c339ee527a11dcb
      <Footer />
    </div>
  );
};

export default Homepage;