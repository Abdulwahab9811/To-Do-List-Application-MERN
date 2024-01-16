import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  
import '../CSS/Login.css';

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate(); // Use useNavigate from react-router-dom
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isAuthenticated) {
      toast.info('You are already signed in.');
      navigate('/homepage');
      return;
    }

    const endpoint = isSignUp ? 'http://localhost:5000/signup' : 'http://localhost:5000/signin';

    const formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      console.log('Submitting form...');
const response = await axios.post(endpoint, formData, { withCredentials: true });
console.log('Response:', response.data);


      // Handle successful response
      console.log(response.data);

      // Update the AuthContext values with the user and token
      login(response.data.user, response.data.token);

      // Display a success toast notification
      toast.success(response.data.message, 'Signed in successfully ');

      console.log('Redirecting to homepage...');
      navigate('/homepage');
    } catch (error) {
      // Handle error response
      console.error('Error:', error.message);

      // Display an error toast notification
      if (error.response && error.response.status === 401) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
    
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`}>
      <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
        {isSignUp ? (
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Sign Up</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Sign In</button>
          </form>
        )}
      </div>
      <div className="toggle-container">
        <div className={`toggle ${isSignUp ? '' : 'active'}`}>
          <div className={`toggle-panel toggle-left ${isSignUp ? 'active' : ''}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" onClick={toggleForm}>
              Sign In
            </button>
          </div>
          <div className={`toggle-panel toggle-right ${isSignUp ? '' : 'active'}`}>
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="hidden" onClick={toggleForm}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
