import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './StudentProfile.css'; // Ensure this matches your CSS filename

function StudentProfile() {
  const [student, setStudent] = useState({
    contact: '',
    dept: '',
    batch: '',
    section: '',
    registerNo: '',
    faculty: { id: '', name: '' }, // Faculty details
  });
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!email || !token) return;

      try {
        const response = await axios.get(`http://127.0.0.1:8080/students/email/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [email, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveProfile = async () => {
    try {
      await axios.put(`http://127.0.0.1:8080/students/updateByEmail/${email}`, student, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating student data:', error);
    }
  };

  return (
    <div className="student-profile-container">
      <div className="student-profile-card">
        <div className="student-profile-header">
          <div className="student-profile-picture">
            <FaUserCircle className="student-profile-icon" />
          </div>
          <h1>Student Profile</h1>
        </div>
        {isEditing ? (
          <form className="student-profile-form">
            {[
              { field: 'contact', label: 'Contact' },
              { field: 'dept', label: 'Department' },
              { field: 'batch', label: 'Batch' },
              { field: 'section', label: 'Section' },
              { field: 'registerNo', label: 'Register Number' },
              { field: 'faculty', label: 'Faculty (ID)', isFacultyField: true },
            ].map(({ field, label, isFacultyField }) => (
              <div className="student-form-group" key={field}>
                <label htmlFor={field}>{label}</label>
                <input
                  type="text"
                  id={field}
                  name={isFacultyField ? 'faculty.id' : field}
                  value={isFacultyField ? student.faculty.id : student[field]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <div className="student-profile-actions">
              <button type="button" className="student-btn save-btn" onClick={handleSaveProfile}>
                Save
              </button>
              <button type="button" className="student-btn cancel-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="student-profile-info">
            <p><strong>Contact:</strong> {student.contact}</p>
            <p><strong>Department:</strong> {student.dept}</p>
            <p><strong>Batch:</strong> {student.batch}</p>
            <p><strong>Section:</strong> {student.section}</p>
            <p><strong>Register Number:</strong> {student.registerNo}</p>
            <p><strong>Faculty:</strong> {student.faculty.name || 'N/A'}</p>
            <div className="student-profile-actions">
              <button className="student-btn edit-btn" onClick={handleEditProfile}>
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;
