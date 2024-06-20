import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const StatusConfirmation = ({ show, handleClose, handleUpdate, status, isChecked }) => {
  const statusText = isChecked ? `marked as ${status}` : `marked as not ${status}`;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`Confirm ${status}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`Are you sure this laundry has been ${statusText}?`}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

StatusConfirmation.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default StatusConfirmation;