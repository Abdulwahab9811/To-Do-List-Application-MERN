import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic for handling form submission
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`}>
      <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
        {isSignUp ? (
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <label htmlFor="signup-username">Username</label>
            <input type="text" id="signup-username" name="signup-username" required />

            <label htmlFor="signup-email">Email</label>
            <input type="email" id="signup-email" name="signup-email" required />

            <label htmlFor="signup-password">Password</label>
            <input type="password" id="signup-password" name="signup-password" required />

            <button type="submit">Sign Up</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <label htmlFor="signin-username">Username</label>
            <input type="text" id="signin-username" name="signin-username" required />

            <label htmlFor="signin-password">Password</label>
            <input type="password" id="signin-password" name="signin-password" required />

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
    </div>
  );
};

export default Login;
