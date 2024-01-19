// authController.js

const { insertUser, connectToDatabase , getUser } = require('../models/user');
const { ObjectId } = require('mongodb');
const { createSecretToken } = require('../utils/secretToken');
const bcrypt = require('bcrypt');

async function findOneUserByEmail(email) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('Users');
  return usersCollection.findOne({ email });
}

async function findOneUserByUsername(username) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('Users');
  return usersCollection.findOne({ username });
}

async function getUserById(id) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('Users');
  return usersCollection.findOne({ _id: new ObjectId(id) });

}


module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username,Fullname  } = req.body;
    const existingUser = await findOneUserByEmail(email);
    const existingUsername = await findOneUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }

    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken', success: false });
    }

     const newPassword = await bcrypt.hash(password, 12)
     
    const newUser = {
      email,
      password: newPassword,
      username,
      Fullname,
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

module.exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User found', success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};
