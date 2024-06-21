/* eslint-disable no-unused-vars */
// EditOrderForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditOrderForm = ({ show, handleClose, order }) => {
  const [formData, setFormData] = useState({
    phoneNumber: order?.phoneNumber || "",
    weight: order?.weight || "",
    serviceType: order?.serviceType || "",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        phoneNumber: order.phoneNumber,
        weight: order.weight,
        serviceType: order.serviceType,
      });
    }
  }, [order]);

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

      const response = await axios.put(`http://localhost:8081/api/update-order/${order.id}`, formData, {
        headers: {
          "X-API-Token": token,
        },
      });

      console.log("Response status:", response.status); // Log the response status
      console.log("Customer updated:", response.data);
      alert("Succes updating order!");
      handleClose();
    } catch (error) {
      console.error("Error updating customer:", error.response ? error.response.data : error.message);
      alert("Error updating customer. Please try again.");
    }
  };

  if (!order) {
    return null; // Return null if customer is not defined
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Weight (kg)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Service Type</Form.Label>
            <Form.Control 
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            as="select">
              {/* Options should come from database */}
              <option>Express</option>
              <option>Regular</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Paid Status</Form.Label>
            <Form.Check type="radio" label="Pay Now" name="paidStatus" />
            <Form.Check type="radio" label="Pay Later" name="paidStatus" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditOrderForm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EditOrderForm;
