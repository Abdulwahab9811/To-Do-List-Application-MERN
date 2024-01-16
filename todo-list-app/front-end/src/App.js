// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Task from './components/Task';
import Account from './components/Account';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Task />} />
        <Route element={<Navbar />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
