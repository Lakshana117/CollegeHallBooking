import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Typography from '@mui/material/Typography';

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [editBooking, setEditBooking] = useState(null);

  useEffect(() => {
    // Fetch all bookings from the backend
    axios.get('http://127.0.0.1:8080/api/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the bookings!", error);
      });
  }, []);

  // Handle delete booking
  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8080/api/bookings/${id}`) // Corrected template literal
      .then(() => {
        setBookings(bookings.filter(booking => booking.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the booking!", error);
      });
  };

  // Handle edit booking dialog open
  const handleEditOpen = (booking) => {
    setEditBooking(booking);
  };

  // Handle edit booking dialog close
  const handleEditClose = () => {
    setEditBooking(null);
  };

  // Handle edit booking form submit
  const handleEditSubmit = () => {
    axios.put(`http://127.0.0.1:8080/api/bookings/${editBooking.id}`, editBooking) // Corrected template literal
      .then(response => {
        setBookings(bookings.map(booking => booking.id === editBooking.id ? response.data : booking));
        setEditBooking(null);
      })
      .catch(error => {
        console.error("There was an error updating the booking!", error);
      });
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Booking Requests
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Event Name</TableCell>
            <TableCell>Event Details</TableCell>
            <TableCell>Event Date</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.email}</TableCell>
              <TableCell>{booking.name}</TableCell>
              <TableCell>{booking.year}</TableCell>
              <TableCell>{booking.dept}</TableCell>
              <TableCell>{booking.sec}</TableCell>
              <TableCell>{booking.eventName}</TableCell>
              <TableCell>{booking.eventDetails}</TableCell>
              <TableCell>{booking.eventDate}</TableCell>
              <TableCell>{booking.startTime}</TableCell>
              <TableCell>{booking.endTime}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditOpen(booking)}>Edit</Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(booking.id)} style={{ marginLeft: 10 }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Booking Dialog */}
      {editBooking && (
        <Dialog open={true} onClose={handleEditClose}>
          <DialogTitle>Edit Booking</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={editBooking.email}
              onChange={(e) => setEditBooking({ ...editBooking, email: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={editBooking.name}
              onChange={(e) => setEditBooking({ ...editBooking, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Year"
              fullWidth
              value={editBooking.year}
              onChange={(e) => setEditBooking({ ...editBooking, year: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Department"
              fullWidth
              value={editBooking.dept}
              onChange={(e) => setEditBooking({ ...editBooking, dept: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Section"
              fullWidth
              value={editBooking.sec}
              onChange={(e) => setEditBooking({ ...editBooking, sec: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Event Name"
              fullWidth
              value={editBooking.eventName}
              onChange={(e) => setEditBooking({ ...editBooking, eventName: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Event Details"
              fullWidth
              value={editBooking.eventDetails}
              onChange={(e) => setEditBooking({ ...editBooking, eventDetails: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Event Date"
              fullWidth
              value={editBooking.eventDate}
              onChange={(e) => setEditBooking({ ...editBooking, eventDate: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Start Time"
              fullWidth
              value={editBooking.startTime}
              onChange={(e) => setEditBooking({ ...editBooking, startTime: e.target.value })}
            />
            <TextField
              margin="dense"
              label="End Time"
              fullWidth
              value={editBooking.endTime}
              onChange={(e) => setEditBooking({ ...editBooking, endTime: e.target.value })}
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

export default BookingRequests;
