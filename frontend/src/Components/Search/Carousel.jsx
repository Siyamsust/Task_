import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Cards.css";
import { ToursContext } from "../../Context/ToursContext";

const Carousel = () => {
  const { tours, loading, error } = useContext(ToursContext);

  if (loading) return <p>Loading tours...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div><h4>Popular Destinations</h4></div>
      <div className="carousel-container">
        {tours.map((tour) => (
          <div key={tour._id} className="card">
            <img
              src={tour.images?.length ? `http://localhost:4000/${tour.images[0]}` : "/default-image.jpg"}
              alt={tour.name}
              className="card-image"
            />
            <div className="card-content">
              <h3>{tour.name}</h3>
              <p>{tour.itinerary}</p>
              <p>Price: ${tour.price}</p>
              <Link to={`/tourDetails/${tour._id}`} className="card-link">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
