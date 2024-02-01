// Navbar.js
import React from 'react';
import { useEffect } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import '../CSS/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user; // Check if user is truthy, indicating authentication
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    // This will re-render the component when `user` changes
  }, [user]);

  const handleLogout = () => {
    logout();
    // You may want to redirect the user to the login page after logout
    navigate('/login');
  };

  return (
    <nav>
      {isAuthenticated && (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/homepage">
              Homepage
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/account">
              Account
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/tasks">
              Tasks
            </NavLink>
          </li>
          <li className="nav-item">
            <span className="nav-link" onClick={handleLogout}>
              Logout
            </span>
          </li>
        </ul>
      )}
      {!isAuthenticated && (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
