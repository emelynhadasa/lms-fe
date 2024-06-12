/* eslint-disable no-unused-vars */
// EditCustomerForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditCustomerForm = ({ show, handleClose, customer }) => {
  const [formData, setFormData] = useState({
    name: customer?.name || "",
    phoneNumber: customer?.phoneNumber || "",
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        phoneNumber: customer.phoneNumber,
      });
    }
  }, [customer]);

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

      const response = await axios.put(`http://localhost:8081/api/customers/${customer.id}`, formData, {
        headers: {
          "X-API-Token": token,
        },
      });

      console.log("Response status:", response.status); // Log the response status
      console.log("Customer updated:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error updating customer:", error.response ? error.response.data : error.message);
      alert("Error updating customer. Please try again.");
    }
  };

  if (!customer) {
    return null; // Return null if customer is not defined
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Customer</Modal.Title>
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

EditCustomerForm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  customer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditCustomerForm;
