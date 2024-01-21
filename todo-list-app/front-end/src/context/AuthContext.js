
//authcontext.js

import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library to generate a unique ID if userData does not contain one

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null); // Add a new state variable for the user ID

  const login = (userData) => {
    let userID = null;
    if (userData._id) {
      userID = userData._id;
    } else {
      userID = uuidv4();
    }
  
    setUser({ ...userData, _id: userID });
    setToken(getCookie('token')); // Use a function to get the cookie
    setUserId(userID);
  };
  
  // Add a function to get a cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setUserId(null); // Clear the user ID when logging out
  };

  return (
    <AuthContext.Provider value={{ user, token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  console.log('AuthContext values:', auth);
  return auth;
};
