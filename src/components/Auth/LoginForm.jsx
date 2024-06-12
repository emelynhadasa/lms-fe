/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import PropTypes from 'prop-types'; // Import prop-types

const LoginForm = ({ setToken }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:8081/api/auth/login', {
        username: formData.username,
        password: formData.password,
      });
      console.log('Response from server:', response); // Log the response for debugging

      if (response.data && response.data.data && response.data.data.token) {
        const { token } = response.data.data; // Extract the token from the API response
        setToken(token); // Set the token in the parent component's state
        localStorage.setItem('token', token); // Store the token in localStorage
        alert('Login successful!');
        navigate('/dashboard'); // Redirect to the dashboard page
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-page">
      <div className="login-form">
        <h2 className="mb-4">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button variant="primary" type="submit" className="mb-3 loginBtn">
            Login
          </Button>
        </Form>
        <p>
          <span>Have not had an account?</span> <Link to="/register" className="register-link">Register here.</Link>
        </p>
      </div>
    </div>
  );
};

// Add prop-types validation
LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginForm;
