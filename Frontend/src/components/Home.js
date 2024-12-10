import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Element } from 'react-scroll';
import './Home.css';
import AboutUs from './About';
import ContactUs from './ContactUs';
import Gallery from './Gallery';
import Footer from './Footer'; // Import Footer
import skctlogo from './skctlogo.png'; // Adjust the path as needed

function Home() {
  const navigate = useNavigate();

  return (
    <div className="Home">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1>Welcome to Sri Krishna College Hall Booking</h1>
          <h4>Looking to book a hall for your next event? Enroll now and secure your space.</h4>
        </div>
        <div className="logo-container">
          <img src={skctlogo} alt="Logo" className="welcome-logo" />
        </div>
      </div>

      {/* Other Sections */}
      <Element id="gallery">
        <Gallery />
      </Element>

      <Element id="about-us">
        <AboutUs />
      </Element>

      <Element id="contact-us">
        <ContactUs />
      </Element>

      <Footer /> {/* Add Footer here */}
    </div>
  );
}

export default Home;
