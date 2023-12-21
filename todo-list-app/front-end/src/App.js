// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/components/Login';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';



const App = () => {
  return (
    <Router>
      <Navbar/> 
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/account" element={<div>My Account Page</div>} />
          <Route path="/tasks" element={<div>My Tasks Page</div>} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


