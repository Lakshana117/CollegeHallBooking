import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const ContactDetails = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Fetch all contact messages when the component mounts
    axios.get('http://127.0.0.1:8080/api/contact-messages')
      .then(response => {
        setContactMessages(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the contact messages!', error);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewMessage({
      ...newMessage,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/contact-messages', newMessage)
      .then(response => {
        setContactMessages([...contactMessages, response.data]);
        handleClose();
      })
      .catch(error => {
        console.error('There was an error adding the contact message!', error);
      });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Contact Details
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Message
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Contact Message</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              name="name"
              value={newMessage.name}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              name="email"
              value={newMessage.email}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Message"
              type="text"
              fullWidth
              name="message"
              value={newMessage.message}
              onChange={handleChange}
              required
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactDetails;
