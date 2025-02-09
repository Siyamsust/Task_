import React from 'react';
import './PackageGallery.css';

const PackageGallery = ({ images, activeImage, setActiveImage }) => {
  return (
    <div className="image-gallery">
      <img 
        src={`http://localhost:4000/${images[activeImage]}`} 
        alt="Tour" 
        className="main-image"
      />
      <div className="image-thumbnails">
        {images.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:4000/${img}`}
            alt={`Tour ${index + 1}`}
            className={activeImage === index ? 'active' : ''}
            onClick={() => setActiveImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageGallery; 