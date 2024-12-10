import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Halls.css'; // Assuming you have a separate CSS file

const Halls = () => {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // or however you store your token

    axios.get('http://127.0.0.1:8080/api/halls', {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    })
      .then(response => {
        setHalls(response.data);
      })
      .catch(error => console.error('Error fetching halls:', error));
  }, []);

  return (
    <div className="halls-container">
      <h2 className="halls-heading">Available Halls</h2>
      <div className="halls-grid">
        {halls.map(hall => (
          <div key={hall.id} className="hall-card">
            <div className="hall-content">
              <div className="hall-image-container">
                <img
                  src={hall.imageUrl || 'default-image-url.jpg'}
                  alt={hall.name}
                  className="hall-image"
                />
              </div>
              <h5 className="hall-name">{hall.name}</h5>
              <p className="hall-info">Capacity: {hall.capacity} | per hall</p>
              <p className="hall-info">Location: {hall.location}</p>
              <div className="hall-button-container">
                <Link 
                  to={`/hostel/${hall.id}`}
                  className="hall-button"
                >
                  See More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Halls;
