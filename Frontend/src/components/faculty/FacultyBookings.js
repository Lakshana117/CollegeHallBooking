import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import './FacultyBookings.css';

function FacultyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingsByMonth, setBookingsByMonth] = useState([]);

    const email = localStorage.getItem('email');

    // Fetch bookings by email
    const fetchBookings = async () => {
        if (!email) {
            setError('Faculty email not found');
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8080/api/bookings/email/${email}`);
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            setBookings(data);
            processBookingsForChart(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    // Process data for bar chart (Booking count per month)
    const processBookingsForChart = (bookings) => {
        const bookingsByMonth = Array(12).fill(0);
        bookings.forEach((booking) => {
            const month = new Date(booking.eventDate).getMonth();
            bookingsByMonth[month]++;
        });

        const formattedData = bookingsByMonth.map((count, index) => ({
            month: new Date(0, index).toLocaleString('default', { month: 'short' }),
            count,
        }));

        setBookingsByMonth(formattedData);
    };

    useEffect(() => {
        fetchBookings();
    }, [email]);

    // Delete booking
    const deleteBooking = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8080/api/bookings/${id}`, {
                method: 'DELETE',
            });
            fetchBookings();
        } catch (error) {
            console.error('Failed to delete booking', error);
        }
    };

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="faculty-bookings-container">
            <h2 className="faculty-h2">Faculty Bookings Overview</h2>

            {/* Table Section */}
            <div className="faculty-bookings-table-container">
                <table className="faculty-bookings-table">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Details</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.eventName}</td>
                                <td>{booking.eventDate}</td>
                                <td>
                                    {booking.startTime} - {booking.endTime}
                                </td>
                                <td>{booking.eventDetails}</td>
                                <td>
                                    <button
                                        className="faculty-delete-button"
                                        onClick={() => deleteBooking(booking.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bar Chart Section */}
            <div className="faculty-bar-chart-container">
                <h3 className="faculty-h3">Bookings Count by Month</h3>
                <BarChart
                    width={800}
                    height={300}
                    data={bookingsByMonth}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#845EC2" barSize={40} radius={[10, 10, 0, 0]} />
                </BarChart>
            </div>
        </div>
    );
}

export default FacultyBookings;
