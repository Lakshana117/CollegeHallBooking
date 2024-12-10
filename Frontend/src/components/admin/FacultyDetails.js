import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, CircularProgress } from '@mui/material';

const FacultyDetails = () => {
  const [faculties, setFaculties] = useState([]);
  const [editFaculty, setEditFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const fetchFaculties = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:8080/api/faculties', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Sending token for authentication
      }
    })
      .then(response => {
        setFaculties(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("There was an error fetching the faculties!");
        setLoading(false);
      });
  };

  useEffect(() => {
    const role = localStorage.getItem('role'); // Assuming 'role' is stored in localStorage
    if (role !== 'ADMIN') {
      setError("You do not have permission to access this page.");
    } else {
      fetchFaculties();
    }
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8080/api/faculties/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Sending token for authentication
      }
    })
      .then(() => {
        setFaculties(faculties.filter(faculty => faculty.id !== id));
        setSnackbar({ open: true, message: "Faculty deleted successfully", severity: 'success' });
      })
      .catch(error => {
        setSnackbar({ open: true, message: "There was an error deleting the faculty", severity: 'error' });
      });
  };

  const handleEditOpen = (faculty) => {
    setEditFaculty(faculty);
  };

  const handleEditClose = () => {
    setEditFaculty(null);
  };

  const handleEditSubmit = () => {
    axios.put(`http://127.0.0.1:8080/api/faculties/${editFaculty.id}`, editFaculty, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Sending token for authentication
      }
    })
      .then(response => {
        setFaculties(faculties.map(faculty => faculty.id === editFaculty.id ? response.data : faculty));
        setEditFaculty(null);
        setSnackbar({ open: true, message: "Faculty updated successfully", severity: 'success' });
      })
      .catch(error => {
        setSnackbar({ open: true, message: "There was an error updating the faculty", severity: 'error' });
      });
  };

  if (error) {
    return (
      <Paper style={{ padding: 20 }}>
        <Typography variant="h4" gutterBottom>
          Faculty Details
        </Typography>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Faculty Details
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Expertise</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faculties.map((faculty) => (
              <TableRow key={faculty.id}>
                <TableCell>{faculty.id}</TableCell>
                <TableCell>{faculty.department}</TableCell>
                <TableCell>{faculty.designation}</TableCell>
                <TableCell>{faculty.expertise}</TableCell>
                <TableCell>{faculty.user.id}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEditOpen(faculty)}>Edit</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(faculty.id)} style={{ marginLeft: 10 }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Edit Faculty Dialog */}
      {editFaculty && (
        <Dialog open={true} onClose={handleEditClose}>
          <DialogTitle>Edit Faculty</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Department"
              fullWidth
              value={editFaculty.department}
              onChange={(e) => setEditFaculty({ ...editFaculty, department: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Designation"
              fullWidth
              value={editFaculty.designation}
              onChange={(e) => setEditFaculty({ ...editFaculty, designation: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Expertise"
              fullWidth
              value={editFaculty.expertise}
              onChange={(e) => setEditFaculty({ ...editFaculty, expertise: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">Cancel</Button>
            <Button onClick={handleEditSubmit} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default FacultyDetails;
