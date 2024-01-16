// // PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';

// const PrivateRoute = ({ element, ...props }) => {
//   const { user } = useAuth();

//   return user ? <Route element={element} {...props} /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;

