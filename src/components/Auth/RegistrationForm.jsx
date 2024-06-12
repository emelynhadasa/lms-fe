/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Api from '../../global/api'; // Adjust the path to match your project structure

const RegistrationForm = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await Api.registerUser({
        username: formData.username,
        name: formData.name,
        password: formData.password,
      });
      alert('Registration successful!');
      console.log(response);
      navigate('/dashboard'); // Redirect to the dashboard page
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="registration-form">
        <h2 className="mb-4">Register</h2>
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

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
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

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button variant="primary" type="submit" className="mb-3 registerBtn">
            Register
          </Button>
        </Form>
        <p>
          <span>Already have an account?</span> <Link to="/" className="login-link">Login here.</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
