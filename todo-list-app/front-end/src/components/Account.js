import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Account.css'

const MyAccount = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    profilePicture: '',
    fullName: '',
  });

  useEffect(() => {
    // Fetch user data from the server (replace 'userId' with the actual user ID)
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/userId'); // Replace 'userId' with the actual user ID
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to fetch data once when the component mounts

  const handleProfilePictureChange = (e) => {
    // Handle changes to the profile picture input
    // You may need to implement the logic for uploading the file to the server
    // and updating the profilePicture state accordingly
    // For now, let's assume you are updating the profilePicture directly from the input value
    setUserData({ ...userData, profilePicture: e.target.value });
  };

  const handleFullNameChange = (e) => {
    setUserData({ ...userData, fullName: e.target.value });
  };

  return (
    <div className="container">
      <div className="form-container">
        <form>
          <h1>My Account</h1>
          <ProfilePictureForm
            profilePicture={userData.profilePicture}
            onProfilePictureChange={handleProfilePictureChange}
          />
          <UserInformationForm
            username={userData.username}
            email={userData.email}
            fullName={userData.fullName}
            onFullNameChange={handleFullNameChange}
          />
        </form>
      </div>
    </div>
  );
};

const ProfilePictureForm = ({ profilePicture, onProfilePictureChange }) => (
  <div>
    <label htmlFor="profilePicture">Profile Picture</label>
    {profilePicture && <img src={profilePicture} alt="Profile" />}
    <input
      type="file"
      id="profilePicture"
      name="profilePicture"
      accept="image/*"
      onChange={onProfilePictureChange}
    />
  </div>
);

const UserInformationForm = ({ username, email, fullName, onFullNameChange }) => (
  <div>
    <label htmlFor="username">Username</label>
    <input type="text" id="username" name="username" value={username} readOnly />

    <label htmlFor="email">Email</label>
    <input type="email" id="email" name="email" value={email} readOnly />

    <label htmlFor="fullName">Full Name</label>
    <input
      type="text"
      id="fullName"
      name="fullName"
      value={fullName}
      onChange={onFullNameChange}
    />
  </div>
);

export default MyAccount;