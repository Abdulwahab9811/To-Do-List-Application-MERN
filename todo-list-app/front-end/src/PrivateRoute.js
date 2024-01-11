//PrivateRoute.js
// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('PrivateRoute isAuthenticated:', isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
