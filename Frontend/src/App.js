import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
// import Hallss from './components/Hallss';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';

import AdminPanel from './components/admin/AdminPanel';
import BookingForm from './components/BookingForm';

import Halls from './components/hallss/Halls';
import HostelDetails from './components/hallss/HallDetails';
import StudentPanel from './components/student/StudentPanel';
import FacultyPanel from './components/faculty/FacultyPanel';
import Register from './components/Register';
function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/halls" element={<Hallss />} /> */}
          {/* <Route path="/vankatraman-hall" element={<VankatramanHall />} /> */}
          {/* <Route path="/es-seminar-hall" element={<ESSeminarHall />} /> */}
          {/* <Route path="/facilities" element={<Facilities />} /> */}
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/hall/:id" element={<HostelDetails />} />
          
          {/* <Route path="/events" element={<Events />} />  */}
          </Route>{/* Add the route for Events */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/studentpanel/*" element={<StudentPanel />} />
          <Route path="/faculty/*" element={<FacultyPanel />} />
          {/* Add other hall routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
