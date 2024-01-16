// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';// Import BrowserRouter
import App from '../src/App';

const root = createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    {/* Wrap your App component with BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
