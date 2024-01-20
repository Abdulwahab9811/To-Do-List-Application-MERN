// axios-config.js
import axios from 'axios';
import { useAuth } from './AuthContext';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Set your base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from the authentication context
    const { token } = useAuth();

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
