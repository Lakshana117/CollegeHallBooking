import React from 'react';
import './Gallery.css';

const Gallery = () => {
  const images = [
    'https://skct.edu.in/wp-content/uploads/2024/04/SKCT-College-Campus-14.jpg',
    'https://skct.edu.in/wp-content/uploads/2024/04/SKCT-College-Campus-13.jpg',
    'https://skct.edu.in/wp-content/uploads/2024/04/SKCT-College-Campus-11.jpg',
    'https://skct.edu.in/wp-content/uploads/2024/04/SKCT-Classroom-6.jpg',
    'https://skct.edu.in/wp-content/uploads/2024/04/SKCT-College-Campus-3.jpg',
    'https://skct.edu.in/wp-content/uploads/2024/04/SKCT-College-Campus-20.jpg',
  ];

  // Duplicate the images array to create a loop effect
  const allImages = [...images, ...images];

  return (
    <section id="Gallery" className="gallery-section">
      <div className="gallery-container">
        <h1 className="text-center fw-bold mb-4">Our Gallery</h1>
        <div className="image-track">
          {allImages.map((src, index) => (
            <div key={index} className="gallery-slide">
              <img
                className="gallery-img"
                src={src}
                alt={`Gallery Image ${index % images.length + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
