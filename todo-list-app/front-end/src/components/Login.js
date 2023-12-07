import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`}>
      <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
        {isSignUp ? (
          <form>
            <h1>Create Account</h1>
            {/* ... rest of the sign-up form */}
            <button>Sign Up</button>
          </form>
        ) : (
          <form>
            <h1>Sign In</h1>
            {/* ... rest of the sign-in form */}
            <button>Sign In</button>
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
