import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AuthPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      // Check if the user is logged in (has a token)
      if (cookies.token) {
        try {
          const { data } = await axios.get(
            "http://localhost:5000/auth/verify-user",
            { withCredentials: true }
          );
  
          const { status, user } = data;
          setUsername(user);
  
          if (status) {
            toast(`Hello ${user}`, {
              position: "top-right",
            });
          }
        } catch (error) {
          // Handle unauthorized or other errors
          console.error("Error during user verification:", error.message);
        }
      }
    };

    verifyCookie();
  }, [cookies]); // Only run the effect when cookies change

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = { username, email, password };

      let url;
      let action;

      if (isSignUp) {
        url = 'http://localhost:5000/auth/register';
        action = 'Registration';
      } else {
        url = 'http://localhost:5000/auth/login';
        action = 'Login';
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log(`${action} Server Response:`, response);

      if (!response.ok) {
        if ( response.status === 401) {
          throw new Error ('Incorrect Username or Password')
        }
        throw new Error(`${action} failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(`${action} Server Result:`, result);

      alert(`${action} successful!`);

      localStorage.setItem('token', result.token);
      navigate('/homepage');

    } catch (error) {
      console.error(`Error during ${isSignUp ? 'registration' : 'login'}:`, error.message);
      alert(`Error: ${error.message}`); 
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`}>
      <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
        {isSignUp ? (
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <label htmlFor="signup-username">Username</label>
            <input type="text" id="signup-username" name="signup-username" value={username} onChange={(e) => setUsername(e.target.value)} required />

            <label htmlFor="signup-email">Email</label>
            <input type="email" id="signup-email" name="signup-email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="signup-password">Password</label>
            <input type="password" id="signup-password" name="signup-password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit">Sign Up</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <label htmlFor="signin-username">Username</label>
            <input type="text" id="signin-username" name="signin-username" value={username} onChange={(e) => setUsername(e.target.value)} required />

            <label htmlFor="signin-password">Password</label>
            <input type="password" id="signin-password" name="signin-password" value={password} onChange={(e) => setPassword(e.target.value)} required />

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

export default AuthPage;

