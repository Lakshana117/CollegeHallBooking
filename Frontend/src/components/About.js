import React from 'react';
import './About.css';

const AboutUs = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-overlay"></div>
      <div className="about-container">
        <div className="about-content-container">
          <div className="about-image">
            <img src="https://www.srikrishna.ac.in/images/Institution-Logo.png" alt="Institution Logo" />
          </div>
          <div className="about-content">
            <h1 className="about-title">About Us</h1>
            <p className="about-description">
              We are committed to delivering excellence through our hall booking service. With a history rooted in innovation, we strive to make every booking experience smooth and memorable.
            </p>
            <p className="about-description">
              Our mission is to lead the industry by offering unmatched services and constantly evolving to meet the needs of our clients.
            </p>
            <p className="about-description">
              Our team is driven by passion, ensuring every event is a success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
