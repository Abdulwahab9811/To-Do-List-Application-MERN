import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider} from './context/AuthContext';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Task from './components/Task';
import Account from './components/Account';
import Navbar from './components/Navbar';



const App = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};


export default App;

