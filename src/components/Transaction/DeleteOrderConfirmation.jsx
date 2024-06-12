/* eslint-disable no-unused-vars */
// DeleteOrderConfirmation.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const DeleteOrderConfirmation = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this order?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteOrderConfirmation.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DeleteOrderConfirmation;
