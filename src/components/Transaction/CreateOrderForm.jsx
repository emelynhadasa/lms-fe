import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CreateOrderForm = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    weight: '',
    serviceType: '',
    paidStatus: 'false',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8081/api/create-order',
        formData
      );
      console.log('Response status:', response.status);
      console.log('Order added:', response.data);
      handleClose(); // Close the modal
    } catch (error) {
      console.error(
        'Error adding order:',
        error.response ? error.response.data : error.message
      );
      alert('Error adding order. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
          <Form.Group className="mb-3">
            <Form.Label>Weight (kg)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Service Type</Form.Label>
            <Form.Control
              as="select"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
            >
              <option value="">Select service type</option>
              <option value="express">Express</option>
              <option value="regular">Regular</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="radio"
              label="Pay Now"
              name="paidStatus"
              value="true"
              checked={formData.paidStatus === 'true'}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="Pay Later"
              name="paidStatus"
              value="false"
              checked={formData.paidStatus === 'false'}
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

CreateOrderForm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CreateOrderForm;
