/* eslint-disable no-unused-vars */
// TransactionList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TransactionList = ({ onEdit, onDelete, onStatusChange }) => {
  // This data should come from your state or props in a real application
  const transactions = [
    { id: 1, phone: '123-456-7890', kg: 5, service: 'Wash', total: 100, date: '2024-06-10', hour: '10:00', paid: false, done: false, pickedUp: false },
    { id: 2, phone: '098-765-4321', kg: 10, service: 'Dry Clean', total: 200, date: '2024-06-11', hour: '12:00', paid: true, done: true, pickedUp: false },
    // More dummy data
  ];

  return (
    <div className="transaction-list">
      <h2>List of Transactions</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Phone</th>
            <th>Kg</th>
            <th>Service</th>
            <th>Total</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Paid?</th>
            <th>Done?</th>
            <th>Picked Up?</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.phone}</td>
              <td>{transaction.kg}</td>
              <td>{transaction.service}</td>
              <td>{transaction.total}</td>
              <td>{transaction.date}</td>
              <td>{transaction.hour}</td>
              <td>
                <Form.Check 
                  type="checkbox" 
                  checked={transaction.paid} 
                  onChange={(e) => onStatusChange('paid', e.target.checked)} 
                />
              </td>
              <td>
                <Form.Check 
                  type="checkbox" 
                  checked={transaction.done} 
                  onChange={(e) => onStatusChange('done', e.target.checked)} 
                />
              </td>
              <td>
                <Form.Check 
                  type="checkbox" 
                  checked={transaction.pickedUp} 
                  onChange={(e) => onStatusChange('picked up', e.target.checked)} 
                />
              </td>
              <td>
                <Link to="#" onClick={onEdit}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

TransactionList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default TransactionList;
