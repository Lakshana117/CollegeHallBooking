import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Sri Krishna College of Technology (SKCT)</h3>
        <p>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> Kovaipudur, Coimbatore - 641042, Tamil Nadu, India
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} /> +91-422-2984567, +91-422-2984568
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> General Inquiries: <a href="mailto:info@skct.edu.in">info@skct.edu.in</a><br />
          Principal's Office: <a href="mailto:principal@skct.edu.in">principal@skct.edu.in</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
