// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS/Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log('Navbar.js: isAuthenticated:', isAuthenticated);
  return (
    <nav>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {isAuthenticated && (
          <li className="nav-item">
            <NavLink className="nav-link" to="/homepage">
              Homepage
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li className="nav-item">
            <NavLink className="nav-link" to="/account">
              Account
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li className="nav-item">
            <NavLink className="nav-link" to="/tasks">
              Tasks
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

