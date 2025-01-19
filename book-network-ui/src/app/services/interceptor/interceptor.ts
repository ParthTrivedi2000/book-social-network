import axios from 'axios';

// Create the Axios instance with a base URL for your API
const interceptorInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8088/api/v1',  // Change to your actual backend API URL
});

// Request interceptor to add the Authorization token
interceptorInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage
    console.log('Token being sent in request:', token);  // Log token for debugging
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Attach the token to request headers
    }
    return config; // Proceed with the request
  },
  (error) => {
    return Promise.reject(error);  // Handle request error
  }
);

// Response interceptor to handle common errors
interceptorInstance.interceptors.response.use(
  (response) => {
    return response; // Return the successful response
  },
  (error) => {
    // Handle errors (e.g., token expiry, unauthorized)
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error); // Handle all other errors
  }
);

export default interceptorInstance;
