// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import '../CSS/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Access authentication state and functions

  const handleLogout = () => {
    logout();
    // You may want to redirect the user to the login page after logout
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
            <button className="nav-link" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};
export default Navbar;