import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import EditOrderForm from './EditOrderForm';
import CreateOrderForm from './CreateOrderForm'; // Import the CreateOrderForm

const TransactionList = ({ onEdit, onStatusChange }) => {
  const [orders, setOrders] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false); 
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await Axios.get(
        'http://localhost:8081/api/get-order/paginate'
      );
      setOrders(response.data.content);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // const handleEdit = (order) => {
  //   setSelectedOrder(order);
  //   setShowEditForm(true);
  // };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedOrder(null);
    fetchOrders();
  };

  const handleCreateOrder = () => {
    setShowCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="transaction-list">
      <h2>List of Transactions</h2>
      <Button variant="primary" onClick={handleCreateOrder}>
        Create New Order
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Phone</th>
            <th>Kg</th>
            <th>Service</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Paid?</th>
            <th>Done?</th>
            <th>Picked Up?</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.phoneNumber}</td>
              <td>{order.weight}</td>
              <td>{order.serviceType}</td>
              <td>{new Date(order.paidDate).toLocaleDateString()}</td>
              <td>{new Date(order.paidDate).toLocaleTimeString()}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={order.isPaid}
                  onChange={(e) =>
                    onStatusChange(order.id, 'isPaid', e.target.checked)
                  }
                />
              </td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={order.done}
                  onChange={(e) =>
                    onStatusChange(order.id, 'done', e.target.checked)
                  }
                />
              </td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={order.pickedUp}
                  onChange={(e) =>
                    onStatusChange(order.id, 'pickedUp', e.target.checked)
                  }
                />
              </td>
              <td>
                <Link to="#" onClick={() => onEdit(order.id)}>
                  Edit
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
      <CreateOrderForm // Render the CreateOrderForm if showCreateForm is true
        show={showCreateForm}
        handleClose={handleCloseCreateForm}
        fetchOrders={fetchOrders} // Pass fetchOrders to the CreateOrderForm
      />
    </div>
  );
};

TransactionList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default TransactionList;
