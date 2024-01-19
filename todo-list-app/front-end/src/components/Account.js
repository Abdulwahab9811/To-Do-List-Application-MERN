import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../CSS/Account.css';

const MyAccount = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="form-container">
        <form>
          <h1>My Account</h1>
          
          {/* Correct the prop name to `Fullname` */}
          <UserInformationForm username={user.username} email={user.email} Fullname={user.Fullname} />
        </form>
      </div>
    </div>
  );
};

const UserInformationForm = ({ username, email, Fullname }) => (
  <div>
    <label htmlFor="fullname">Fullname</label>
    <input type="text" id="fullname" name="fullname" value={Fullname} readOnly />

    <label htmlFor="username">Username</label>
    <input type="text" id="username" name="username" value={username} readOnly />

    <label htmlFor="email">Email</label>
    <input type="email" id="email" name="email" value={email} readOnly />
  </div>
);

export default MyAccount;
