import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HallDetails.css';

const HallDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState(null);
  const [booked, setBooked] = useState(false);
  const [userRole, setUserRole] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Set user role from local storage
    const role = localStorage.getItem('role');
    setUserRole(role);

    // Fetch hostel details with authorization header
    axios.get(`http://127.0.0.1:8080/api/hosteldetails/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        // Ensure hostel details are fetched properly
        if (response.data) {
          setHostel(response.data);
          setBooked(response.data.booked);
        } else {
          console.error('No hostel data received');
        }
      })
      .catch(error => console.error('Error fetching hostel:', error));
  }, [id, token]);

  // Function to handle "Book Now" button click
  const handleBookNow = () => {
    navigate('/booking');
  };

  // Loading state check
  if (!hostel) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
        Loading hostel details...
      </div>
    );
  }

  // Display content for all roles, both students and faculty can book the hall
  return (
    <div className="halls-container" style={{
      backgroundImage: `url("https://skct.edu.in/wp-content/uploads/2024/04/SKCT-College-Campus-14.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.9,
      color: 'white'
    }}>
      <div className="halls-content">
        <div className="hall-detail-flex">
          <div className="hall-detail-image">
            <img
              src={hostel.imageUrl}
              alt={hostel.name}
              className="hall-detail-img"
            />
          </div>
          <div className="hall-detail-info">
            <h2 className="hall-detail-heading">{hostel.name}</h2>
            <p className="hall-detail-description">Description: {hostel.description}</p>
            <p className="hall-detail-capacity">Capacity: {hostel.capacity} per hall</p>
            <p className="hall-detail-location">Location: {hostel.location}</p>
            <div className="hall-detail-button-container">
              {/* Show "Book Now" for all roles */}
              <button
                onClick={handleBookNow}
                className="hall-detail-button"
                disabled={booked}
              >
                {booked ? 'Already Booked' : 'Book Now'}
              </button>
              {/* If the hall is already booked, show a note */}
              {booked && <p className="hall-detail-note">This hall is already booked.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallDetails;
