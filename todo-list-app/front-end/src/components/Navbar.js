// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/homepage"  className="nav-link">Home</Link></li>
        <li><Link to="/account" className="nav-link">My Account</Link></li>
        <li><Link to="/tasks" className="nav-link"> My Tasks</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
