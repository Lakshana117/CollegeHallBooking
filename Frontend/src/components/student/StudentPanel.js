import React, { useState } from 'react';
import { FaBars, FaCalendarAlt, FaHome, FaSignOutAlt, FaTachometerAlt, FaUser } from 'react-icons/fa';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import StudentBookings from './StudentBookings';
// import UserDashboard from './UserDashboard';
import StudentProfile from './StudentProfile';
import './StudentPanel.css';

function StudentPanel() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        navigate('/login');
    };

    return (
        <div className={`student-panel ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <div className="student-sidebar">
                <div className="student-sidebar-header">
                    <img src="https://th.bing.com/th/id/OIP.OdQQJxf0UFikV_SreFYyoQAAAA?rs=1&pid=ImgDetMain" alt="User" className="profile-pic" />
                    <h2>STUDENT</h2>
                    <span className="student-status online">Online</span>
                </div>
                <ul>
                    {/* <li><Link to="dashboard"><FaTachometerAlt /> Dashboard</Link></li> */}
                    <li><Link to="student-profile"><FaUser /> Profile</Link></li>
                    <li><Link to="student-bookings"><FaCalendarAlt /> Bookings</Link></li>
                    <li><Link to="/" ><FaHome /> Home</Link></li>
                </ul>
                <button className="student-logout-button" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
            </div>
            <div className="student-main-content">
                <button className="student-toggle-sidebar" onClick={toggleSidebar}><FaBars /></button>
                <Routes>
                    {/* <Route path="dashboard" element={<UserDashboard />} /> */}
                    <Route path="student-profile" element={<StudentProfile />} />
                    <Route path="student-bookings" element={<StudentBookings />} />
                </Routes>
            </div>
        </div>
    );
}

export default StudentPanel;
