// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

function PrivateRoute({ children }) {
 const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

 return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;