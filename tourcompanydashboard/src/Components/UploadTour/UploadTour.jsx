import React, { useState } from 'react';
import './UploadTour.css';  // Import the CSS file for styling

const UploadTour = () => {
  const [tourDetails, setTourDetails] = useState({
    name: '',
    itinerary: '',
    price: '',
    availability: '',
    startDate: '',
    endDate: '',
    destinations: [{ name: '', description: '' }],
    images: [],
    discount: '',
    category: [],  // New property for categories
  });

  const categoriesList = ['Adventure', 'Relaxation', 'Cultural', 'Family', 'Romantic']; // Example categories

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourDetails({
      ...tourDetails,
      [name]: value
    });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTourDetails({
        ...tourDetails,
        category: [...tourDetails.category, value]
      });
    } else {
      setTourDetails({
        ...tourDetails,
        category: tourDetails.category.filter((cat) => cat !== value)
      });
    }
  };

  const handleDestinationsChange = (e, index, field) => {
    const { value } = e.target;
    const newDestinations = [...tourDetails.destinations];
    newDestinations[index][field] = value;
    setTourDetails({
      ...tourDetails,
      destinations: newDestinations
    });
  };

  const addDestination = () => {
    setTourDetails({
      ...tourDetails,
      destinations: [...tourDetails.destinations, { name: '', description: '' }]
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setTourDetails({
      ...tourDetails,
      images: [...tourDetails.images, ...files]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    formData.append('name', tourDetails.name);
    formData.append('itinerary', tourDetails.itinerary);
    formData.append('price', tourDetails.price);
    formData.append('availability', tourDetails.availability);
    formData.append('startDate', tourDetails.startDate);
    formData.append('endDate', tourDetails.endDate);
    formData.append('discount', tourDetails.discount);
    formData.append('category', JSON.stringify(tourDetails.category)); // Add categories
    formData.append('destinations', JSON.stringify(tourDetails.destinations));
    
    tourDetails.images.forEach((image) => {
      formData.append('images', image);
    });
  
    try {
      const response = await fetch('http://localhost:4000/api/tours', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Tour uploaded successfully');
        console.log(result);
      } else {
        alert(`Failed to upload tour: ${result.error}`);
      }
    } catch (error) {
      console.error('Error uploading tour:', error);
      alert('An error occurred while uploading the tour');
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = tourDetails.images.filter((_, i) => i !== index);
    setTourDetails({
      ...tourDetails,
      images: updatedImages
    });
  };

  return (
    <div className="upload-tour">
      <h1>Upload New Tour</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tour Name"
          value={tourDetails.name}
          onChange={handleChange}
        />
        <textarea
          name="itinerary"
          placeholder="Itinerary"
          value={tourDetails.itinerary}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={tourDetails.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability (e.g., available, sold out)"
          value={tourDetails.availability}
          onChange={handleChange}
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={tourDetails.startDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={tourDetails.endDate}
          onChange={handleChange}
        />
        
        {/* Categories */}
        <div className="categories">
          <h3>Categories</h3>
          {categoriesList.map((category, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={category}
                checked={tourDetails.category.includes(category)}
                onChange={handleCategoryChange}
              />
              {category}
            </label>
          ))}
        </div>

        {/* Destinations */}
        <div className="destinations">
          <h3>Destinations</h3>
          {tourDetails.destinations.map((destination, index) => (
            <div key={index} className="destination">
              <input
                type="text"
                placeholder="Destination Name"
                value={destination.name}
                onChange={(e) => handleDestinationsChange(e, index, 'name')}
              />
              <textarea
                placeholder="Destination Description"
                value={destination.description}
                onChange={(e) => handleDestinationsChange(e, index, 'description')}
              />
            </div>
          ))}
          <button type="button" onClick={addDestination}>Add Destination</button>
        </div>
        
        {/* Multiple Image Upload */}
        <div className="file-upload">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
          />
          <div className="image-preview">
            {tourDetails.images.map((image, index) => (
              <div key={index} className="image-preview-item">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  className="image-thumbnail"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="remove-image-button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Discount */}
        <input
          type="text"
          name="discount"
          placeholder="Discount (optional)"
          value={tourDetails.discount}
          onChange={handleChange}
        />
        
        <button type="submit">Upload Tour</button>
      </form>
    </div>
  );
};

export default UploadTour;
