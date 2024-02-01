// authcontext.js
import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  

  const login = (userData) => {
    let userID = null;
    if (userData._id) {
      userID = userData._id;
    } else {
      userID = uuidv4();
    }
  
    setUser({ ...userData, _id: userID });
    setToken(getCookie('token'));
    setUserId(userID);
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    setUser(null);
    setToken(null);
    setUserId(null); 
    
    
  };

  return (
    <AuthContext.Provider value={{ user, token, userId, login, logout }}>
      {children} {/* Pass navigate as a prop to children */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  console.log('AuthContext values:', auth);
  return auth;
};
