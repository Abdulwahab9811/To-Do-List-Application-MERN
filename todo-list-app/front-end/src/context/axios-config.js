// // context/axios-config.js

// import axios from 'axios';
// import { useAuth } from './AuthContext';

// const useAxiosConfig = () => {
//   const { token } = useAuth();

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:5000/api',
//     timeout: 10000,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   axiosInstance.interceptors.request.use(
//     (config) => {
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance;
// };

// export default useAxiosConfig;