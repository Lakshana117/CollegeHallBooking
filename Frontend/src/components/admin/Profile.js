import React, { useState } from 'react';
import { Typography, Avatar, Box, Button, TextField, IconButton, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './Profile.css'; // Import the CSS file

const ProfileContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 20px',
  backgroundColor: '#f4f6f8',
  borderRadius: '12px',
  boxShadow: '0px 5px 15px rgba(0,0,0,0.2)',
  maxWidth: '600px',
  width: '100%',
  margin: '40px auto',
});

const ProfilePicStyled = styled(Avatar)({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '20px',
  border: '5px solid #007bff',
  cursor: 'pointer',
});

const ProfileHeaderStyled = styled('div')({
  textAlign: 'center',
  marginBottom: '32px',
});

const ProfileDetails = styled(Box)({
  width: '100%',
});

const DetailItem = styled(Box)({
  marginBottom: '15px',
  display: 'flex',
  alignItems: 'center',
});

const ProfileButtons = styled(Box)({
  display: 'flex',
  justifyContent: 'center', // Centering the Save button
  width: '100%',
  marginTop: '30px',
});

const EditButton = styled(Button)({
  padding: '10px 20px',
  borderRadius: '6px',
  border: 'none',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  margin: '0 10px',
  backgroundColor: '#007bff',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: localStorage.getItem('email') || '',
    username: localStorage.getItem('username') || 'Admin Name',
    password: localStorage.getItem('password') || '********',
  });
  const [notification, setNotification] = useState({ open: false, message: '', type: '' });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put('/api/admin/updateProfile', formData); // Replace with your API endpoint
      setEditing(false);
      localStorage.setItem('email', formData.email);
      localStorage.setItem('username', formData.username);
      localStorage.setItem('password', formData.password);
      setNotification({ open: true, message: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      setNotification({ open: true, message: 'Failed to update profile. Please try again.', type: 'error' });
    }
  };

  const handleProfilePicClick = () => {
    // Handle profile picture upload functionality here
  };

  return (
    <ProfileContainer className="profile-container">
      <ProfileHeaderStyled className="profile-header">
        <ProfilePicStyled
          alt="Admin Profile"
          src="https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg" // Updated profile picture URL
          className="profile-pic"
          onClick={handleProfilePicClick}
        />
        {editing ? (
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            fullWidth
            margin="normal"
            className="profile-username-edit"
          />
        ) : (
          <Typography variant="h6" className="profile-name">
            {formData.username}
          </Typography>
        )}
        <Typography variant="body2" className="profile-role">
          Role:Admin
        </Typography>
      </ProfileHeaderStyled>
      <ProfileDetails className="profile-details">
        <DetailItem className="detail-item">
          <Typography variant="body1">
            <strong>Email:</strong>
          </Typography>
          {editing ? (
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
              margin="normal"
              className="profile-email-edit"
            />
          ) : (
            <Typography variant="body1" className="profile-email">
              {formData.email}
            </Typography>
          )}
        </DetailItem>
        <DetailItem className="detail-item">
          <Typography variant="body1">
            <strong>Password:</strong>
          </Typography>
          {editing ? (
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              type="password"
              fullWidth
              margin="normal"
              className="profile-password-edit"
            />
          ) : (
            <Typography variant="body1" className="profile-password">
              {formData.password}
            </Typography>
          )}
        </DetailItem>
      </ProfileDetails>
      <ProfileButtons className="profile-buttons">
        {editing ? (
          <EditButton className="save-button" onClick={handleSaveClick}>
            Save
          </EditButton>
        ) : (
          <IconButton onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        )}
      </ProfileButtons>

      {/* Snackbar for notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        message={notification.message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setNotification({ ...notification, open: false })}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        severity={notification.type}
      >
        {notification.type === 'success' ? <CheckCircleIcon /> : <CloseIcon />}
      </Snackbar>
    </ProfileContainer>
  );
};

export default Profile;
