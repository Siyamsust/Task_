import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Carousel from './Carousel';
import Categories from './Categories';
import FeaturedTours from './FeaturedTours';
import TransportOptions from './TransportOptions';
import './Search.css';
import './Categories.css'
const Search = () => {
  const [destination, setDestination] = useState("");

  const handleSearch = (newDestination) => {
    setDestination(newDestination);
    // Optionally handle the search logic here
  };
  return (
    <div className="search-page">
      {/* Search Bar Section */}
      <header>
        <SearchBar onSearch={handleSearch} />
      </header>

      {/* Categories Section */}
      <section className="categories-section">
        {/* <Categories /> */}
        <div className="categories">
        <h3>Explore by Categories</h3>
        <div className="category-cards">
          <div className="category-card">Adventure</div>
          <div className="category-card">Relaxation</div>
          <div className="category-card">Family</div>
          <div className="category-card">Adventure</div>
          <div className="category-card">Relaxation</div>
          <div className="category-card">Family</div>
        </div>
      </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel-section">
        <Carousel />
      </section>

      

      {/* Featured Tours Section */}
      <section className="featured-tours-section">
        <FeaturedTours />
      </section>

      {/* Transport Options Section */}
      <section className="transport-options-section">
        <TransportOptions />
      </section>
    </div>
  );
};

export default Search;
