import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FacultyProfile.css';

function FacultyProfile() {
  const [faculty, setFaculty] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    expertise: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchFacultyData = async () => {
      if (!email || !token) return;

      try {
        const response = await axios.get(`http://127.0.0.1:8080/api/faculties/email?email=${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFaculty(response.data);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      }
    };

    fetchFacultyData();
  }, [email, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFaculty(prevFaculty => ({ ...prevFaculty, [name]: value }));
  };

  const handleEditProfile = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleSaveProfile = async () => {
    try {
      await axios.put(`http://127.0.0.1:8080/api/faculties/${faculty.id}`, faculty, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating faculty data:', error);
    }
  };

  return (
    <div className="faculty-profile-container">
      <div className="faculty-profile-header">
        <div className="faculty-profile-icon">👤</div> {/* Icon */}
        <h1 className="faculty-profile-title">Faculty Profile</h1> {/* Title */}
      </div>

      {isEditing ? (
        <div className="faculty-profile-details">
          <p><strong>Department:</strong> 
            <input
              type="text"
              name="department"
              value={faculty.department}
              onChange={handleInputChange}
              className="faculty-profile-input"
            />
          </p>
          <p><strong>Designation:</strong> 
            <input
              type="text"
              name="designation"
              value={faculty.designation}
              onChange={handleInputChange}
              className="faculty-profile-input"
            />
          </p>
          <p><strong>Expertise:</strong> 
            <input
              type="text"
              name="expertise"
              value={faculty.expertise}
              onChange={handleInputChange}
              className="faculty-profile-input"
            />
          </p>
          <div className="faculty-profile-buttons">
            <button onClick={handleSaveProfile} className="faculty-profile-save-btn">Save</button>
            <button onClick={handleCancelEdit} className="faculty-profile-cancel-btn">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="faculty-profile-details">
          <p><strong>Department:</strong> {faculty.department}</p>
          <p><strong>Designation:</strong> {faculty.designation}</p>
          <p><strong>Expertise:</strong> {faculty.expertise}</p>
          <button onClick={handleEditProfile} className="faculty-profile-edit-btn">Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default FacultyProfile;
