const bcrypt = require('bcrypt');
const { createUser } = require('../models/user');

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      const existingUsername = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      if (existingUsername) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user with the hashed password
      const newUser = new User({ username, email, password: hashedPassword });

      // Save the user to the database
      await newUser.save();

      // Call createUser function after the user has been saved
      await createUser({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error in user registration:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the entered password with the hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // If you reach here, the login is successful
  
      // Optionally, you can include user data in the response, such as user ID and username
      res.status(200).json({
        message: 'Login successful',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Error in user login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
};

module.exports = authController;
