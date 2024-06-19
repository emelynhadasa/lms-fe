import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const registerCustomer = async (customerData, token) => {
  try {
    const response = await axios.post(`${API_URL}/customers`, customerData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error registering customer:', error);
    throw error;
  }
};

const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/create-order`, orderData, {
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

const getOrderDetail = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/get-order-detail/${orderId}`, {
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order detail:', error);
    throw error;
  }
};

const updateOrder = async (orderId, orderData) => {
  try {
    const response = await axios.put(`${API_URL}/update-order/${orderId}`, orderData, {
    });
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

const getOrderPaginate = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/get-order/paginate`, {
      params,
    });
    return response.data; // Ensure this returns the full response data
  } catch (error) {
    console.error('Error fetching paginated orders:', error);
    throw error;
  }
};



// Export all API functions under a single object named Api
const Api = {
  registerUser,
  registerCustomer,
  createOrder,
  getOrderDetail,
  updateOrder,
  getOrderPaginate,
};

export default Api;
