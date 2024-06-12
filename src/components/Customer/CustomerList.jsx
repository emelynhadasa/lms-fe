/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios'; // Import Axios for API calls
import EditCustomerForm from './EditCustomerForm';
import DeleteCustomerConfirmation from './DeleteCustomerConfirmation';

const CustomerList = ({ onEdit }) => {
  const [customers, setCustomers] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []); // Empty dependency array to fetch customers only once on component mount

  const fetchCustomers = async () => {
    try {
      const response = await Axios.get('http://localhost:8081/api/customers/paginate');
      setCustomers(response.data.content);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedCustomer(null);
    fetchCustomers(); // Refresh the customer list after editing
  };

  const handleDeleteConfirmation = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token for delete:", token); // Log the token to check its value
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
  
      const config = {
        headers: {
          "X-API-Token": token,
        },
      };
  
      const response = await Axios.delete(`http://localhost:8081/api/customers/${selectedCustomer.id}`, config);
  
      console.log("Delete response status:", response.status); // Log the response status
      console.log("Delete message:", response.data);
      fetchCustomers(); // Refresh the customer list after deletion
      handleCloseDeleteConfirmation();
    } catch (error) {
      console.error("Error deleting customer:", error.response ? error.response.data : error.message);
      alert("Error deleting customer. Please try again.");
    }
  };  

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setSelectedCustomer(null);
  };

  return (
    <div className='customer-list'>
      <h2>List of Customers</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.phoneNumber}</td>
              <td>
                <Link to="#" onClick={() => handleEdit(customer)} className='editLink'>Edit</Link> | <Link to="#" onClick={() => handleDeleteConfirmation(customer)} className='deleteLink'>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedCustomer && (
        <DeleteCustomerConfirmation
          show={showDeleteConfirmation}
          handleClose={handleCloseDeleteConfirmation}
          handleDelete={handleDelete}
        />
      )}
      {selectedCustomer && (
        <EditCustomerForm
        show={showEditForm}
        handleClose={handleCloseEditForm}
        customer={selectedCustomer}
      />
      )}
    </div>
  );
};

CustomerList.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default CustomerList;
