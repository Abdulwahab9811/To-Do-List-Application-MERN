import React from 'react';
import '../CSS/Homepage.css';

const Homepage = () => {
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
        </div>
      </section>

      <section className="logo-section">
        {/* Add your logo or content for the right side */}
         <svg height="300px" id="Layer_1" style={{ enableBackground: 'new 0 0 512 512' }} version="1.1" viewBox="0 0 512 512" width="512px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm114.9 149.1L231.8 359.6c-1.1 1.1-2.9 3.5-5.1 3.5-2.3 0-3.8-1.6-5.1-2.9-1.3-1.3-78.9-75.9-78.9-75.9l-1.5-1.5c-.6-.9-1.1-2-1.1-3.2 0-1.2.5-2.3 1.1-3.2.4-.4.7-.7 1.1-1.2 7.7-8.1 23.3-24.5 24.3-25.5 1.3-1.3 2.4-3 4.8-3 2.5 0 4.1 2.1 5.3 3.3 1.2 1.2 45 43.3 45 43.3l111.3-143c1-.8 2.2-1.4 3.5-1.4 1.3 0 2.5.5 3.5 1.3l30.6 24.1c.8 1 1.3 2.2 1.3 3.5.1 1.3-.4 2.4-1 3.3z" fill="#673ab7" class="fill-000000"></path></svg>
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