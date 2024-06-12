/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateOrderForm from "../Transaction/CreateOrderForm";
import RegisterCustomerForm from '../Customer/RegisterCustomerForm';

const QuickActions = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterShow = () => setShowRegisterForm(true);
  const handleCreateShow = () => setShowCreateForm(true);

  return (
    <div className='quick-actions'>
      <Card className="mb-4">
        <Card.Body>
          <h5 className="card-title">Need quick actions?</h5>
          <div className="d-flex flex-row">
            <Link className="me-2">
              <Button variant="primary" onClick={handleRegisterShow}>
                Register customer
              </Button>
            </Link>
            <Link>
              <Button variant="success" onClick={handleCreateShow}>
                Create new order +
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
      <RegisterCustomerForm show={showRegisterForm} handleClose={() => setShowRegisterForm(false)} />
      <CreateOrderForm show={showCreateForm} handleClose={() => setShowCreateForm(false)} />
    </div>
  );
};

export default QuickActions;
