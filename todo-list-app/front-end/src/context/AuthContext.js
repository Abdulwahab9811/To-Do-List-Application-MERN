
//authcontext.js

import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library to generate a unique ID if userData does not contain one

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null); // Add a new state variable for the user ID

  const login = (userData, authToken) => {
    let userID = null;
    if (userData._id) {
      // If userData contains an _id property, use it as the user ID
      userID = userData._id;
    } else {
      // If userData does not contain an _id property, generate a new unique ID
      userID = uuidv4();
    }
    setUser({ ...userData, _id: userID }); // Add the user ID to the user object before setting it in state
    setToken(authToken);
    setUserId(userID); // Set the user ID in state
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
