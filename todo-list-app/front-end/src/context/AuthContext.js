// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // You can store user information here

  const login = () => {
    // Perform login logic and set isAuthenticated to true
    setIsAuthenticated(true);
    // You may also fetch and set user information here
    // Example: setUser({ id: 1, username: 'exampleUser' });
  };

  const logout = () => {
    // Perform logout logic and set isAuthenticated to false
    setIsAuthenticated(false);
    // Clear user information
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
