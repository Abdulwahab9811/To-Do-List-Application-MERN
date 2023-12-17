import React from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Login from '../src/components/Login';
import Homepage from './components/Homepage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/" element={<Navigate to="/Login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



