// axiosConfig.js
import Axios from 'axios';

// Set up Axios interceptors for request and response
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Refresh the token using the refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const response = await Axios.post('http://localhost:8081/api/auth/refresh-token', {
          refreshToken: refreshToken,
        });
        const newToken = response.data.accessToken;
        
        // Update the token in local storage or state
        localStorage.setItem('token', newToken);
        
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return Axios(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error or redirect to login page
        console.error('Error refreshing token:', refreshError);
        // Redirect to login page or display error message
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
