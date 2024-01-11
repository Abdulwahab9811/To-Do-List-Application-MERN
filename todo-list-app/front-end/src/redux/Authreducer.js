// authReducer.js
import { LOGIN_SUCCESS } from './actionTypes';

const initialState = {
  isAuthenticated: false,
  // other relevant auth state properties
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        // other state updates as needed
      };
    // other cases for different auth actions

    default:
      return state;
  }
};

export default authReducer;
