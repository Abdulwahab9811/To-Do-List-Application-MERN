// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './Authreducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers if needed
});

export default rootReducer;
