import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import StatusConfirmation from './StatusConfirmation';

const TransactionList = () => {
  const [orders, setOrders] = useState([]);
  const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await Axios.get('http://localhost:8081/api/get-order/paginate');
      setOrders(response.data.content);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleCheckboxChange = (order, status, e) => {
    setSelectedOrder(order);
    setPendingStatus(e.target.checked);
    setCurrentStatus(status);
    setShowStatusConfirmation(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
    
      const config = {
        headers: {
          "X-API-Token": token,
        },
      };
    
      // Ensure all necessary fields are included and are either true or false
      const updateData = {
        paidStatus: currentStatus === 'paid' ? pendingStatus : selectedOrder.isPaid !== null ? selectedOrder.isPaid : false,
        done: currentStatus === 'done' ? pendingStatus : selectedOrder.done !== null ? selectedOrder.done : false,
        pickedUp: currentStatus === 'pickedUp' ? pendingStatus : selectedOrder.pickedUp !== null ? selectedOrder.pickedUp : false,
      };
    
      // Debugging: Log updateData and selectedOrder to see the values being sent
      console.log('Selected Order:', selectedOrder);
      console.log('Update Data:', updateData);
    
      // eslint-disable-next-line no-unused-vars
      const response = await Axios.put(
        `http://localhost:8081/api/update-order/${selectedOrder.orderId}`,
        updateData,
        config
      );
    
      fetchOrders(); // Refresh the order list after updating
      setShowStatusConfirmation(false);
      setSelectedOrder(null);
      setPendingStatus(null); 
      alert("Success!");
    
    } catch (error) {
      console.error("Error updating order:", error.response ? error.response.data : error.message);
      alert("Error updating order. Please try again.");
    }
  };  
  
  
  const handleCloseStatusConfirmation = () => {
    setShowStatusConfirmation(false);
    setSelectedOrder(null);
    setPendingStatus(null); // Reset pendingStatus when modal is closed
  };

  return (
    <div className="transaction-list">
      <h2>List of Transactions</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Kg</th>
            <th>Service</th>
            <th>Price</th>
            <th>Paid?</th>
            <th>Paid Date</th>
            <th>Done?</th>
            <th>Done Date</th>
            <th>Picked Up?</th>
            <th>Picked Up Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderId}</td>
              <td>{order.cusName}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.weight}</td>
              <td>{order.serviceType}</td>
              <td>{order.totalPrice}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={order.isPaid}
                  onChange={(e) => handleCheckboxChange(order, 'paid', e)}
                />
              </td>
              <td>{order.paidDate ? new Date(order.paidDate).toLocaleString() : ''}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={order.done}
                  onChange={(e) => handleCheckboxChange(order, 'done', e)}
                />
              </td>
              <td>{order.doneDate ? new Date(order.doneDate).toLocaleString() : ''}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={order.pickedUp}
                  onChange={(e) => handleCheckboxChange(order, 'pickedUp', e)}
                />
              </td>
              <td>{order.pickedUpDate ? new Date(order.pickedUpDate).toLocaleString() : ''}</td>
              <td>
                <Link>
                  Send
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedOrder && (
        <StatusConfirmation
          show={showStatusConfirmation}
          handleClose={handleCloseStatusConfirmation}
          handleUpdate={handleUpdate} // Pass the handleUpdate function
          status={currentStatus}
          isChecked={pendingStatus}
        />
      )}
    </div>
  );
};

TransactionList.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
};

export default TransactionList;
