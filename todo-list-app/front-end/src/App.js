// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider ,  useSelector } from 'react-redux'; 
import Login from '../src/components/Login';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Task from './components/Task';
import Account from './components/Account';
import store from '../src/redux/store';



const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Provider store={store}>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
