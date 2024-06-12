/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const RegisterCustomerForm = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Component Mounted. Token:", token); // Log token on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Token at submit:", token); // Log the token to check its value
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }

      const response = await axios.post("http://localhost:8081/api/customers", formData, {
        headers: {
          "X-API-Token": token,
        },
      });

      console.log("Response status:", response.status); // Log the response status
      console.log("Customer added:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error adding customer:", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized: Invalid token. Please log in again.");
      } else {
        alert("Error adding customer. Please try again.");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register New Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

RegisterCustomerForm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RegisterCustomerForm;
