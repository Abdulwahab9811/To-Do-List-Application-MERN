// Homepage.js
import React from 'react';
import '../CSS/Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <section className="quotes-section">
        <h1 className='Title'>Welcome to Your Todo List App</h1>
        <div>
          <h2>Motivational Quotes</h2>
          <div className="quote">
            <p className="quote-text">Stay focused and never give up!</p>
          </div>
          <div className="quote">
            <p className="quote-text">The only way to do great work is to love what you do.</p>
          </div>
          <div className="quote">
            <p className="quote-text">Your future self will thank you for staying organized.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2>Why Use a Todo List App?</h2>
        <p>Stay organized, prioritize tasks, and achieve your goals with our todo list app.</p>
        <p>Reduce stress, increase productivity, and take control of your daily life.</p>
        <p>Get started now by creating your own todo list!</p>
      </section>

      <section className="image-section">
        {/* You can add your images here */}
        {/* <img src="your-image-url" alt="Image description" /> */}
      </section>
    </div>
  );
};

export default Homepage;
