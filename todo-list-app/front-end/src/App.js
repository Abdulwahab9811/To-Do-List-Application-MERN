import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Task from './components/Task';
import Account from './components/Account';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={<Task />} />
      <Route element={<Navbar />}>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/account" element={<Account />} />
        
      </Route>
    </Routes>
  );
};

export default App;



