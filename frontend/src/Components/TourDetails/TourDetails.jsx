import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ToursContext } from "../../Context/ToursContext";
import "./TourDetails.css";

const TourDetails = () => {
  const { tourId } = useParams();
  const { tours, loading, error } = useContext(ToursContext);

  if (loading) return <p>Loading tour details...</p>;
  if (error) return <p>Error: {error}</p>;

  const tour = tours.find((tour) => tour._id === tourId);

  if (!tour) return <p>Tour not found</p>;

  return (
    <div className="tour-details">
      <h1>{tour.name}</h1>

      {/* Image Slider */}
      <div className="slider-container">
        <ImageSlider images={tour.images} />
      </div>

      <div className="tour-info">
        <p><strong>Itinerary:</strong> {tour.itinerary}</p>
        <p><strong>Price:</strong> ${tour.price}</p>
        <p><strong>Availability:</strong> {tour.availability}</p>
        <p><strong>Start Date:</strong> {new Date(tour.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(tour.endDate).toLocaleDateString()}</p>
        <p><strong>Discount:</strong> {tour.discount || "No discount available"}</p>
        <p><strong>Categories:</strong> {tour.category.join(", ")}</p>
      </div>

      <div className="destinations">
        <h3>Destinations</h3>
        {tour.destinations.map((destination, index) => (
          <div key={index} className="destination">
            <h4>{destination.name}</h4>
            <p>{destination.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageSlider = ({ images }) => {
  const [currentImage, setCurrentImage] = React.useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider">
      <button className="prev" onClick={prevImage}>❮</button>
      <img
        src={`http://localhost:4000/${images[currentImage]}`}
        alt="Tour"
        className="slider-image"
      />
      <button className="next" onClick={nextImage}>❯</button>
    </div>
  );
};

export default TourDetails;
