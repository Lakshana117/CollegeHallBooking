import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const HallsDetails = () => {
  const [hostels, setHostels] = useState([]);
  const [editHostel, setEditHostel] = useState(null);
  const [newHostel, setNewHostel] = useState({
    name: '',
    description: '',
    capacity: 0,
    location: '',
    imageUrl: ''
  });
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');

  // Verify if the user is admin
  useEffect(() => {
    if (userRole !== 'ADMIN') {
      alert('Access Denied! Admins only.');
      navigate('/');
    } else {
      fetchHostelDetails();
    }
  }, [userRole, navigate]);

  // Fetch hostel details with authorization header
  const fetchHostelDetails = () => {
    const token = localStorage.getItem('token');

    axios.get('http://127.0.0.1:8080/api/hosteldetails', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setHostels(response.data);
      })
      .catch(error => {
        console.error("Error fetching hostel details:", error);
      });
  };

  // Handle delete hostel with authorization header
  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); // Fetch the token

    axios.delete(`http://127.0.0.1:8080/api/hosteldetails/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setHostels(hostels.filter(hostel => hostel.id !== id));
      })
      .catch(error => {
        console.error("Error deleting the hostel:", error);
        alert("Failed to delete the hostel. Please try again.");
      });
  };

  // Handle opening edit dialog
  const handleEditOpen = (hostel) => {
    setEditHostel({ ...hostel }); // Create a copy of the hostel for editing
  };

  // Handle closing edit dialog
  const handleEditClose = () => {
    setEditHostel(null);
  };

  // Handle input change in the edit form
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditHostel((prevEditHostel) => ({
      ...prevEditHostel,
      [name]: name === "capacity" ? parseInt(value) : value,
    }));
  };

  // Handle submit for editing the hostel
  const handleEditSubmit = () => {
    const token = localStorage.getItem('token');
    axios.put(`http://127.0.0.1:8080/api/hosteldetails/${editHostel.id}`, editHostel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setHostels(
          hostels.map((hostel) => hostel.id === response.data.id ? response.data : hostel)
        );
        setEditHostel(null);
      })
      .catch(error => {
        console.error("Error updating hostel details:", error);
      });
  };

  // Handle adding a new hostel
  const handleAddHostel = () => {
    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:8080/api/hosteldetails', newHostel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setHostels([...hostels, response.data]);
        setNewHostel({
          name: '',
          description: '',
          capacity: 0,
          location: '',
          imageUrl: ''
        });
      })
      .catch(error => {
        console.error("Error adding new hostel:", error);
      });
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel: Hall Details
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Image URL</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hostels.map((hostel) => (
            <TableRow key={hostel.id}>
              <TableCell>{hostel.id}</TableCell>
              <TableCell>{hostel.name}</TableCell>
              <TableCell>{hostel.description}</TableCell>
              <TableCell>{hostel.capacity}</TableCell>
              <TableCell>{hostel.location}</TableCell>
              <TableCell>
                <a href={hostel.imageUrl} target="_blank" rel="noopener noreferrer">
                  View Image
                </a>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditOpen(hostel)}>Edit</Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(hostel.id)} style={{ marginLeft: 10 }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add New Hostel Form */}
      <Typography variant="h6" style={{ marginTop: 20 }}>
        Add New Hall
      </Typography>
      <TextField margin="dense" label="Name" fullWidth value={newHostel.name} onChange={(e) => setNewHostel({ ...newHostel, name: e.target.value })} />
      <TextField margin="dense" label="Description" fullWidth value={newHostel.description} onChange={(e) => setNewHostel({ ...newHostel, description: e.target.value })} />
      <TextField margin="dense" label="Capacity" fullWidth type="number" value={newHostel.capacity} onChange={(e) => setNewHostel({ ...newHostel, capacity: parseInt(e.target.value) })} />
      <TextField margin="dense" label="Location" fullWidth value={newHostel.location} onChange={(e) => setNewHostel({ ...newHostel, location: e.target.value })} />
      <TextField margin="dense" label="Image URL" fullWidth value={newHostel.imageUrl} onChange={(e) => setNewHostel({ ...newHostel, imageUrl: e.target.value })} />
      <Button variant="contained" color="primary" onClick={handleAddHostel} style={{ marginTop: 20 }}>
        Add Hall
      </Button>

      {/* Edit Hostel Dialog */}
      {editHostel && (
        <Dialog open={true} onClose={handleEditClose}>
          <DialogTitle>Edit Hall</DialogTitle>
          <DialogContent>
            <TextField margin="dense" label="Name" fullWidth name="name" value={editHostel.name} onChange={handleEditChange} />
            <TextField margin="dense" label="Description" fullWidth name="description" value={editHostel.description} onChange={handleEditChange} />
            <TextField margin="dense" label="Capacity" fullWidth type="number" name="capacity" value={editHostel.capacity} onChange={handleEditChange} />
            <TextField margin="dense" label="Location" fullWidth name="location" value={editHostel.location} onChange={handleEditChange} />
            <TextField margin="dense" label="Image URL" fullWidth name="imageUrl" value={editHostel.imageUrl} onChange={handleEditChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  );
};

export default HallsDetails;
