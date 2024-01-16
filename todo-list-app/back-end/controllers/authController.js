// authController.js

const { insertUser, connectToDatabase } = require('../models/user');
const { createSecretToken } = require('../utils/secretToken');
const bcrypt = require('bcrypt');

async function findOneUserByEmail(email) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('Users');
  return usersCollection.findOne({ email });
}

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await findOneUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }
     const newPassword = await bcrypt.hash(password, 12)
     
    const newUser = {
      email,
      password: newPassword,
      username,
    };

    await insertUser(newUser);

    const token = createSecretToken(newUser._id);
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ message: 'User signed up successfully', success: true, user: newUser });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

module.exports.Signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(`Attempting sign-in for email: ${email}`);

    const user = await findOneUserByEmail(email);

    if (!user) {
      console.log(`User not found for email: ${email}`);
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const compareResult = await bcrypt.compare(password, user.password);

    if (!compareResult) {
      console.log(`Password does not match for email: ${email}`);
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    console.log(`Sign-in successful for email: ${email}`);

    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(200).json({ message: 'User signed in successfully', success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};
