// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './Authreducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers if you have them
});

export default rootReducer;
