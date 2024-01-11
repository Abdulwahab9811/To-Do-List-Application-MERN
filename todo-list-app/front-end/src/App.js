
import React  from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/components/Login';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import  Task  from './components/Task'; 
import Account from './components/Account'
import PrivateRoute from './PrivateRoute';




const App = () => {

  return (
    <Router>
    <Navbar />
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<PrivateRoute><Homepage /></PrivateRoute>} />
        <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route
          path="/tasks" element={<PrivateRoute><Task /></PrivateRoute>}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;


