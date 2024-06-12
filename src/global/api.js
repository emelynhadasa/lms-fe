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

// Export all API functions under a single object named Api
const Api = {
  registerUser,
  registerCustomer,
  // Add other API functions here as needed
};

export default Api;
