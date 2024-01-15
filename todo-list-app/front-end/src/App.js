//app.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Task from './components/Task';
import Account from './components/Account';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = true; 
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/homepage" element={<ProtectedRoute element={<Homepage />} />} />
      <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
      <Route path="/navbar" element={<ProtectedRoute element={<Navbar />} />} />
      <Route path="/tasks" element={<ProtectedRoute element={<Task />} />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
