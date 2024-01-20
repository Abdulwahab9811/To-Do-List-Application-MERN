import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';
import { AuthProvider } from './context/AuthContext';
import axiosInstance from './context/axios-config';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

