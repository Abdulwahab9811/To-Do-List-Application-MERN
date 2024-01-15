// Navbar.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS/Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a valid JWT token is present in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // You may want to implement proper JWT verification logic here
      setIsAuthenticated(true);
    }
  }, []); // The empty dependency array ensures this effect runs once on component mount

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

