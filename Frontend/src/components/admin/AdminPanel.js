
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import { Person, Event, School, Assignment, Book, Home, ExitToApp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import ManageHalls from './ManageHalls';
import BookingRequests from './BookingRequests';
import StudentDetails from './StudentDetails';
// import EventDetails from './EventDetails';
import './AdminPanel.css'; // Import the CSS file
import FacultyDetails from './FacultyDetails';
import HallsDetails from './HallsDetails';
import ContactDetailsDetails from './ContactDetails';

const DrawerStyled = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  '& .admin-MuiDrawer-paper': {
    width: 240,
    backgroundColor: '#000',
    color: '#fff',
  },
});

const AppBarStyled = styled(AppBar)({
  zIndex: 1201,
});

const ContentStyled = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const AdminPanel = () => {
  const [selectedView, setSelectedView] = useState('Profile');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Example of removing token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  const renderContent = () => {
    switch (selectedView) {
      case 'Profile':
        return <Profile />;
      case 'ManageHalls':
        return <ManageHalls />;
      case 'BookingRequests':
        return <BookingRequests />;
      case 'StudentDetails':
        return <StudentDetails />;
      case 'FacultyDetails':
        return <FacultyDetails />;
      case 'HallsDetails':
        return <HallsDetails />;
      case 'ContactDetails':
        return <ContactDetailsDetails />;
      default:
        return <Typography variant="h4">Welcome, Admin!</Typography>;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBarStyled position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled variant="permanent">
        <Toolbar />
        <div className="admin-profile-section">
          <Avatar alt="Admin Profile" src="/path/to/profile-picture.jpg" />
          <Typography variant="body1">Admin</Typography>
        </div>
        <List>
          <ListItem button onClick={() => navigate('/')}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => setSelectedView('Profile')}>
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => setSelectedView('ManageHalls')}>
            <ListItemIcon><Book /></ListItemIcon>
            <ListItemText primary="Manage Halls" />
          </ListItem>
          <ListItem button onClick={() => setSelectedView('BookingRequests')}>
            <ListItemIcon><Assignment /></ListItemIcon>
            <ListItemText primary="Booking Requests" />
          </ListItem>
          <ListItem button onClick={() => setSelectedView('StudentDetails')}>
            <ListItemIcon><School /></ListItemIcon>
            <ListItemText primary="Student Details" />

          </ListItem>
          <ListItem button onClick={() => setSelectedView('ContactDetails')}>
            <ListItemIcon><School /></ListItemIcon>
            <ListItemText primary="Contact Details" />
            
          </ListItem>
          <ListItem button onClick={() => setSelectedView('FacultyDetails')}>
            <ListItemIcon><School /></ListItemIcon>
            <ListItemText primary="Faculty Details" />
          </ListItem>
          <ListItem button onClick={() => setSelectedView('HallsDetails')}>
            <ListItemIcon><Event /></ListItemIcon>
            <ListItemText primary="Halls Details" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </DrawerStyled>
      <ContentStyled>
        <Toolbar />
        {renderContent()}
      </ContentStyled>
    </div>
  );
};

export default AdminPanel;
