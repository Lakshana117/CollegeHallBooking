import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const ManageHalls = () => {
  const [halls, setHalls] = useState([]);
  const [editHall, setEditHall] = useState(null);
  const [newHall, setNewHall] = useState({ name: '', capacity: '', location: '', imageUrl: '' });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Assuming role is stored in localStorage

    // Check if the user is an admin
    if (role !== 'ADMIN') {
      navigate('/'); // Redirect to home if not an admin
    }

    // Fetch halls only if the user is admin
    axios.get('http://127.0.0.1:8080/api/halls', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setHalls(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the halls!", error);
      });
  }, [navigate]);

  // Handle delete hall
  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8080/api/halls/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => {
        setHalls(halls.filter(hall => hall.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the hall!", error);
      });
  };

  // Handle edit hall dialog open
  const handleEditOpen = (hall) => {
    setEditHall(hall);
  };

  // Handle edit hall dialog close
  const handleEditClose = () => {
    setEditHall(null);
  };

  // Handle edit hall form submit
  const handleEditSubmit = () => {
    axios.put(`http://127.0.0.1:8080/api/halls/${editHall.id}`, editHall, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        setHalls(halls.map(hall => hall.id === editHall.id ? response.data : hall));
        setEditHall(null);
      })
      .catch(error => {
        console.error("There was an error updating the hall!", error);
      });
  };

  // Handle add hall dialog open
  const handleAddOpen = () => {
    setOpenAddDialog(true);
  };

  // Handle add hall dialog close
  const handleAddClose = () => {
    setOpenAddDialog(false);
    setNewHall({ name: '', capacity: '', location: '', imageUrl: '' });
  };

  // Handle add hall form submit
  const handleAddSubmit = () => {
    axios.post('http://127.0.0.1:8080/api/halls', newHall, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        setHalls([...halls, response.data]);
        handleAddClose();
      })
      .catch(error => {
        console.error("There was an error adding the hall!", error);
      });
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Manage Halls
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddOpen} style={{ marginBottom: 20 }}>
        Add Hall
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Image URL</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {halls.map((hall) => (
            <TableRow key={hall.id}>
              <TableCell>{hall.id}</TableCell>
              <TableCell>{hall.name}</TableCell>
              <TableCell>{hall.capacity}</TableCell>
              <TableCell>{hall.location}</TableCell>
              <TableCell>{hall.imageUrl}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditOpen(hall)}>Edit</Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(hall.id)} style={{ marginLeft: 10 }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Hall Dialog */}
      <Dialog open={openAddDialog} onClose={handleAddClose}>
        <DialogTitle>Add Hall</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={newHall.name}
            onChange={(e) => setNewHall({ ...newHall, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Capacity"
            fullWidth
            value={newHall.capacity}
            onChange={(e) => setNewHall({ ...newHall, capacity: parseInt(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={newHall.location}
            onChange={(e) => setNewHall({ ...newHall, location: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={newHall.imageUrl}
            onChange={(e) => setNewHall({ ...newHall, imageUrl: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Hall Dialog */}
      {editHall && (
        <Dialog open={true} onClose={handleEditClose}>
          <DialogTitle>Edit Hall</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={editHall.name}
              onChange={(e) => setEditHall({ ...editHall, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Capacity"
              fullWidth
              value={editHall.capacity}
              onChange={(e) => setEditHall({ ...editHall, capacity: parseInt(e.target.value) })}
            />
            <TextField
              margin="dense"
              label="Location"
              fullWidth
              value={editHall.location}
              onChange={(e) => setEditHall({ ...editHall, location: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Image URL"
              fullWidth
              value={editHall.imageUrl}
              onChange={(e) => setEditHall({ ...editHall, imageUrl: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  );
};

export default ManageHalls;
