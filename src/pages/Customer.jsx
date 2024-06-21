/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import RegisterCustomerForm from '../components/Customer/RegisterCustomerForm';
import EditCustomerForm from '../components/Customer/EditCustomerForm';
import DeleteCustomerConfirmation from '../components/Customer/DeleteCustomerConfirmation';
import CustomerList from '../components/Customer/CustomerList';
import TopBar from '../components/Bars/TopBar';
import SideBar from '../components/Bars/SideBar';

const Customer = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleRegisterShow = () => setShowRegisterForm(true);
  const handleEditShow = () => setShowEditForm(true);
  const handleDeleteShow = () => setShowDeleteConfirmation(true);

  return (
    <div className='customer-page'>
      <TopBar />
      <SideBar setToken={setToken} />
      <div className='content'>
        <Container>
          <Row className="mb-3">
            <Col xs={12} md={3}>
              <Link to="/customer">
                <Button variant="primary" onClick={handleRegisterShow} className='registerCustBtn'>
                  Register Customer
                </Button>
              </Link>
            </Col>
            <Col xs={12} md={{ span: 6, offset: 3 }}>
              <InputGroup>
                <Form.Control placeholder="Search" />
                <Button variant="outline-secondary" className='searchBtn'>
                  <BsSearch />
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <CustomerList onEdit={handleEditShow} onDelete={handleDeleteShow} />
          <RegisterCustomerForm show={showRegisterForm} handleClose={() => setShowRegisterForm(false)} />
          <EditCustomerForm show={showEditForm} handleClose={() => setShowEditForm(false)} />
          <DeleteCustomerConfirmation show={showDeleteConfirmation} handleClose={() => setShowDeleteConfirmation(false)} />
        </Container>
      </div>
    </div>
  );
};

export default Customer;
