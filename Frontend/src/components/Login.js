import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Pre-defined admin credentials
    const adminEmail = "admin@example.com";
    const adminPassword = "Admin@123";

    try {
      // Check if the entered credentials match the admin
      if (email === adminEmail && password === adminPassword) {
        // Admin hardcoded login
        localStorage.setItem('role', 'ADMIN');
        localStorage.setItem('token', 'dummy-admin-token'); // Replace with real token if needed
        localStorage.setItem('email', adminEmail);
        localStorage.setItem('loged', 'true');
        navigate('/admin/dashboard');
      } else {
        // For other users, call the backend to authenticate
        const response = await axios.post('http://localhost:8080/api/auth/authenticate', { email, password });
        const { token, role } = response.data;

        // Set local storage based on role
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);
        localStorage.setItem('loged', 'true');

        // Redirect based on roles
        if (role === 'STUDENT') navigate('/home');
        else if (role === 'FACULTY') navigate('/home');
        else if (role === 'HEAD') navigate('/home');
        else if (role === 'FACILITATOR') navigate('/home');
        else navigate('/home'); // Default fallback
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}

        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
