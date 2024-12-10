import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Container, Paper, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingForm.css';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        year: '',
        dept: '',
        sec: '',
        eventName: '',
        eventDetails: '',
        eventDate: '',
        numberOfAttendees: '',
        startTime: '',
        endTime: '',
        additionalRequest: ''
    });

    const [role, setRole] = useState('student'); // Default role
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('email') || '';
        const userRole = localStorage.getItem('role') || 'student'; // Retrieve role from localStorage
        setFormData((prevFormData) => ({
            ...prevFormData,
            email: email
        }));
        setRole(userRole); // Set the user's role
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { ...formData };
        if (role === 'hod') {
            delete payload.sec; // Remove section if role is HoD
        }

        try {
            await axios.post('http://127.0.0.1:8080/api/bookings', payload);
            setOpenSnackbar(true);
            setFormData({
                email: '',
                name: '',
                year: '',
                dept: '',
                sec: '',
                eventName: '',
                eventDetails: '',
                eventDate: '',
                numberOfAttendees: '',
                startTime: '',
                endTime: '',
                additionalRequest: ''
            });
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleReturnToForm = () => {
        navigate('/booking');
    };

    return (
        <Container component="main" maxWidth="xl" style={{ padding: 0 }}>
            <div className="booking-container">
                <div className="image-container">
                    <img src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-book-now-in-banner-style-png-image_5683712.png" alt="Booking" />
                </div>
                <Paper elevation={3} className="booking-form">
                    <Typography variant="h5" component="h1" align="center">
                        Booking Form
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Department"
                                    name="dept"
                                    value={formData.dept}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            {/* Conditionally render Section based on role */}
                            {role !== 'hod' && (
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Section"
                                        name="sec"
                                        value={formData.sec}
                                        onChange={handleChange}
                                        required={role === 'student'}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Event Name"
                                    name="eventName"
                                    value={formData.eventName}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Event Details"
                                    name="eventDetails"
                                    value={formData.eventDetails}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Event Date"
                                    name="eventDate"
                                    value={formData.eventDate}
                                    onChange={handleChange}
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Number of Attendees"
                                    name="numberOfAttendees"
                                    value={formData.numberOfAttendees}
                                    onChange={handleChange}
                                    type="number"
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Start Time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="End Time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Additional Request"
                                    name="additionalRequest"
                                    value={formData.additionalRequest}
                                    onChange={handleChange}
                                    multiline
                                    rows={2}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '20px' }}
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={null}
                onClose={handleCloseSnackbar}
                style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="info"
                    style={{ width: '500px', textAlign: 'center', padding: '20px' }}
                >
                    {role === 'hod' 
                        ? 'Booking Details Sent to Admin. HoD Approval Pending.' 
                        : 'Booking Details Sent to Admin. Status: Pending.'}
                    <div>
                        <Button color="inherit" onClick={handleReturnToForm} style={{ marginTop: '10px' }}>
                            Return to Form
                        </Button>
                        <Button color="inherit" onClick={handleCloseSnackbar} style={{ marginTop: '10px' }}>
                            Close
                        </Button>
                    </div>
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default BookingForm;
