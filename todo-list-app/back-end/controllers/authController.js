// authController.js

const { insertUser, connectToDatabase } = require("../models/user");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

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
      return res.json({ message: "User already exists" });
    }

    const newUser = {
      email,
      password: await bcrypt.hash(password, 12),
      username,
    };

    await insertUser(newUser);

    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ message: "User signed in successfully", success: true, user: newUser });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findOneUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(200).json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

