import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const StudentDetails = () => {
  const [students, setStudents] = useState([]); // List of students
  const [editStudent, setEditStudent] = useState(null); // For editing a student
  const [newStudent, setNewStudent] = useState(null); // For adding a new student
  const [departments] = useState(['CSE', 'ECE', 'EEE', 'MECH']); // Department options

  // Fetch all students on component mount
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8080/api/admin/students', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);

  // Handle delete student
  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8080/api/admin/students/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  // Handle opening the edit student dialog
  const handleEditOpen = (student) => {
    setEditStudent(student);
  };

  // Handle closing the edit student dialog
  const handleEditClose = () => {
    setEditStudent(null);
  };

  // Handle editing a student
  const handleEditSubmit = () => {
    axios
      .put(`http://127.0.0.1:8080/api/admin/students/${editStudent.id}`, editStudent, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setStudents(
          students.map((student) =>
            student.id === editStudent.id ? response.data : student
          )
        );
        setEditStudent(null);
      })
      .catch((error) => {
        console.error('Error updating student:', error);
      });
  };

  // Handle opening the add new student dialog
  const handleNewOpen = () => {
    setNewStudent({
      name: '',
      email: '',
      password: '',
      registerNumber: '',
      contact: '',
      department: '',
      batch: '',
      section: '',
    });
  };

  // Handle closing the add new student dialog
  const handleNewClose = () => {
    setNewStudent(null);
  };

  // Handle adding a new student
  const handleNewSubmit = () => {
    axios
      .post('http://127.0.0.1:8080/api/admin/students', newStudent, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setStudents([...students, response.data]);
        setNewStudent(null);
      })
      .catch((error) => {
        console.error('Error adding new student:', error);
      });
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Student Details
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewOpen}
        style={{ marginBottom: 20 }}
      >
        Add New Student
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Register Number</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.registerNumber}</TableCell>
              <TableCell>{student.contact}</TableCell>
              <TableCell>{student.department}</TableCell>
              <TableCell>{student.batch}</TableCell>
              <TableCell>{student.section}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditOpen(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(student.id)}
                  style={{ marginLeft: 10 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Student Dialog */}
      {editStudent && (
        <Dialog open={true} onClose={handleEditClose}>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={editStudent.name}
              onChange={(e) =>
                setEditStudent({ ...editStudent, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={editStudent.email}
              onChange={(e) =>
                setEditStudent({ ...editStudent, email: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Register Number"
              fullWidth
              value={editStudent.registerNumber}
              onChange={(e) =>
                setEditStudent({
                  ...editStudent,
                  registerNumber: e.target.value,
                })
              }
            />
            {/* Repeat for other fields */}
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

      {/* New Student Dialog */}
      {newStudent && (
        <Dialog open={true} onClose={handleNewClose}>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={newStudent.email}
              onChange={(e) =>
                setNewStudent({ ...newStudent, email: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={newStudent.password}
              onChange={(e) =>
                setNewStudent({ ...newStudent, password: e.target.value })
              }
            />
            {/* Repeat for other fields */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleNewSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  );
};

export default StudentDetails;
