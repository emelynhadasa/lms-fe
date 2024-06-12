/* eslint-disable no-unused-vars */
// CreateOrderForm.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateOrderForm = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Weight (kg)</Form.Label>
            <Form.Control type="number" placeholder="Enter weight" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Service Type</Form.Label>
            <Form.Control as="select">
              {/* Options should come from database */}
              <option>Option 1</option>
              <option>Option 2</option>
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
        <Button variant="primary" onClick={handleClose}>
          Save Changes
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
