import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCalendarAlt, FaBars, FaHome, FaSignOutAlt } from 'react-icons/fa';
// import FacultyDashboard from './FacultyDashboard';
import FacultyProfile from './FacultyProfile';
import FacultyBookings from './FacultyBookings';
import './FacultyPanel.css';

function FacultyPanel() {
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
        <div className={`faculty-panel ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <div className="faculty-sidebar">
                <div className="sidebar-header">
                    <img src="https://th.bing.com/th/id/OIP.OdQQJxf0UFikV_SreFYyoQAAAA?rs=1&pid=ImgDetMain" alt="Faculty" className="faculty-profile-pic" />
                    <h2>Faculty</h2>
                    <span className="faculty-status online">Online</span>
                </div>
                <ul>
                    {/* <li><Link to="/faculty/dashboard"><FaTachometerAlt /> Dashboard</Link></li> */}
                    <li><Link to="/faculty/profile"><FaUser /> Profile</Link></li>
                    <li><Link to="/faculty/bookings"><FaCalendarAlt /> Bookings</Link></li>
                    <li><Link to="/" ><FaHome /> Home</Link></li>
                </ul>
                <button className="faculty-logout-button" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
            </div>
            <div className="faculty-main-content">
                <button className="faculty-toggle-sidebar" onClick={toggleSidebar}><FaBars /></button>
                <Routes>
                    {/* <Route path="dashboard" element={<FacultyDashboard />} /> */}
                    <Route path="faculty/profile" element={<FacultyProfile />} />
                    <Route path="faculty/bookings" element={<FacultyBookings />} />
                </Routes>
            </div>
        </div>
    );
}

export default FacultyPanel;
