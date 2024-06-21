import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import EditOrderForm from './EditOrderForm';
import StatusConfirmation from './StatusConfirmation';

const TransactionList = ({ onStatusChange }) => {
  const [orders, setOrders] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pendingStatus, setPendingStatus] = useState(null);

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

  const handleCheckboxChange = (order, e) => {
    setSelectedOrder(order);
    setPendingStatus(e.target.checked);
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

      console.log('Updating order:', selectedOrder); // Debug log
      console.log('Pending status:', pendingStatus); // Debug log
  
      // Assuming the API call for update would be something like this
      const response = await Axios.put(`http://localhost:8081/api/update-order/${selectedOrder.orderId}`, { paidStatus: pendingStatus, done: false, pickedUp: false }, config);
  
      console.log("Update response status:", response.status);
      console.log("Update message:", response.data);
      fetchOrders(); // Refresh the order list after updating
      setShowStatusConfirmation(false);
      setSelectedOrder(null);
      setPendingStatus(null); // Reset pendingStatus after update
      alert("SUKSES!");
    } catch (error) {
      console.error("Error updating order:", error.response ? error.response.data : error.message);
      alert("Error updating order. Please try again.");
    }
  };  

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedOrder(null);
    fetchOrders();
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
                  onChange={(e) => handleCheckboxChange(order, e)}
                />
              </td>
              <td>{order.paidDate ? new Date(order.paidDate).toLocaleString() : ''}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={order.done}
                  onChange={(e) => onStatusChange(order.id, 'done', e.target.checked)}
                />
              </td>
              <td>{order.doneDate ? new Date(order.doneDate).toLocaleString() : ''}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={order.pickedUp}
                  onChange={(e) => onStatusChange(order.id, 'pickedUp', e.target.checked)}
                />
              </td>
              <td>{order.pickedUpDate ? new Date(order.pickedUpDate).toLocaleString() : ''}</td>
              <td>
                <Link to="#" onClick={() => handleEdit(order)}>
                  Send
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedOrder && (
        <EditOrderForm
          show={showEditForm}
          handleClose={handleCloseEditForm}
          order={selectedOrder}
        />
      )}
      {selectedOrder && (
        <StatusConfirmation
          show={showStatusConfirmation}
          handleClose={handleCloseStatusConfirmation}
          handleUpdate={handleUpdate}
          status="paid"
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
