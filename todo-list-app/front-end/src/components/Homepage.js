import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../CSS/Homepage.css';

const Homepage = () => {

  const { user } = useAuth();
  console.log('Rendering Homepage component');
  return (
    <div className="homepage-container">
      <section className="quotes-section">
        <h1 className="title">Welcome to Your Todo List App</h1>
        <div>
          
          <div className="quote">
            <p className="quote-text">Stay focused and never give up!</p>
            <p className="quote-author">- Unknown</p>
          </div>
          <div className="quote">
            <p className="quote-text">The only way to do great work is to love what you do.</p>
            <p className="quote-author">- Steve Jobs</p>
          </div>
          <div className="quote">
            <p className="quote-text">Your future self will thank you for staying organized.</p>
            <p className="quote-author">- You</p>
          </div>
          {user && <p>Welcome, {user.username}!</p>}
        </div>
      </section>

      <section className="logo-section">
      <svg  height="300px"  width="512px"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6 7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" fill="#512da8" className="fill-000000"></path></svg>
        {/* Add your logo or content for the right side */}
         
      </section>

      <section className="info-section">
        <h2>Why Use a Todo List App?</h2>
        <p>Stay organized, prioritize tasks, and achieve your goals with our todo list app.</p>
        <p>Reduce stress, increase productivity, and take control of your daily life.</p>
        <p>Get started now by creating your own todo list!</p>
      </section>

      <section className="image-section">
      <img src="/marvin-meyer-SYTO3xs06fU-unsplash.jpg" alt="" 
      style={{ width: '100%', height: 'auto' }}
      />
      </section> 
    </div>
  );
};

export default Homepage;